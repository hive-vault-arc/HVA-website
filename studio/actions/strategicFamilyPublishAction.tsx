import {useCallback, useState} from 'react'
import {
  type DocumentActionComponent,
  type DocumentActionProps,
  useClient,
  useCurrentUser,
} from 'sanity'
import {useToast} from '@sanity/ui'
import {
  routeForStrategicReleaseDocument,
  validateStrategicReleaseFamily,
  type StrategicReleaseDocument,
  type StrategicReleaseMember,
} from '../lib/strategicRelease'

const API_VERSION = '2026-09-13'

type TranslationMetadata = {
  _id: string
  translations?: Array<{value?: {_ref?: string}}>
}

function publishableDocument(document: StrategicReleaseDocument, publishedId: string) {
  const attributes: Record<string, unknown> = {...document}
  delete attributes._id
  delete attributes._rev
  delete attributes._createdAt
  delete attributes._updatedAt
  return {...attributes, _id: publishedId, _type: document._type}
}

export const StrategicFamilyPublishAction: DocumentActionComponent = (
  props: DocumentActionProps,
) => {
  const client = useClient({apiVersion: API_VERSION}).withConfig({perspective: 'raw'})
  const currentUser = useCurrentUser()
  const toast = useToast()
  const [isPublishing, setIsPublishing] = useState(false)

  const onHandle = useCallback(async () => {
    setIsPublishing(true)
    try {
      const publishedId = props.id.replace(/^drafts\./, '')
      const metadata = await client.fetch<TranslationMetadata | null>(
        `*[_type == "translation.metadata" && references($documentId)][0]{
          _id,
          translations[]{value{_ref}}
        }`,
        {documentId: publishedId},
      )
      const referenceIds = Array.from(
        new Set(
          (metadata?.translations || [])
            .map((translation) => translation.value?._ref?.replace(/^drafts\./, ''))
            .filter((reference): reference is string => Boolean(reference)),
        ),
      )

      if (!metadata || referenceIds.length === 0) {
        throw new Error('This document is not connected to a translation family.')
      }

      const draftIds = referenceIds.map((reference) => `drafts.${reference}`)
      const candidates = await client.fetch<StrategicReleaseDocument[]>(
        `*[_id in $referenceIds || _id in $draftIds]{
          ...,
          answerEvidence[]{_ref}
        }`,
        {referenceIds, draftIds},
      )
      const byId = new Map(candidates.map((document) => [document._id, document]))
      const members: StrategicReleaseMember[] = referenceIds.flatMap((referenceId) => {
        const document = byId.get(`drafts.${referenceId}`) || byId.get(referenceId)
        return document ? [{referenceId, document}] : []
      })
      const evidenceIds = Array.from(
        new Set(
          members.flatMap((member) =>
            (member.document.answerEvidence || [])
              .map((reference) => reference._ref?.replace(/^drafts\./, ''))
              .filter((reference): reference is string => Boolean(reference)),
          ),
        ),
      )
      const approvedEvidenceIds = new Set(
        await client.fetch<string[]>(
          `*[
            _type == "evidenceRecord" &&
            _id in $evidenceIds &&
            verificationStatus == "verified" &&
            publiclyCitable == true &&
            (!defined(expiresAt) || dateTime(expiresAt + "T23:59:59Z") >= dateTime(now()))
          ]._id`,
          {evidenceIds},
        ),
      )
      const validations = validateStrategicReleaseFamily(members, approvedEvidenceIds)
      const failures = validations.filter((validation) => validation.status === 'failed')
      if (failures.length) {
        throw new Error(failures.map((failure) => failure.details).join(' '))
      }

      const releasedAt = new Date().toISOString()
      const routes = members
        .map((member) => routeForStrategicReleaseDocument(member.document))
        .filter((route): route is string => Boolean(route))
      const auditId = `strategicReleaseAudit.${Date.now()}.${crypto.randomUUID()}`
      let transaction = client.transaction()

      for (const member of members) {
        if (!member.document._id.startsWith('drafts.')) continue
        transaction = transaction
          .createOrReplace(publishableDocument(member.document, member.referenceId))
          .delete(member.document._id)
      }

      transaction = transaction.create({
        _id: auditId,
        _type: 'strategicReleaseAudit',
        familyId: metadata._id,
        schemaType: members[0]?.document._type,
        status: 'published',
        releasedAt,
        publisher: {
          name: currentUser?.name || 'Unknown company editor',
          userId: currentUser?.id || undefined,
        },
        documents: members.map((member) => ({
          _key: member.document.language || member.referenceId,
          documentId: member.referenceId,
          language: member.document.language,
        })),
        affectedRoutes: Array.from(new Set(routes)),
        validationResults: validations.map((validation) => ({
          _key: validation.check,
          ...validation,
        })),
      })

      await transaction.commit({tag: 'strategic-family.publish'})
      toast.push({
        status: 'success',
        title: 'Approved family published',
        description: `${members.length} translations published with release audit ${auditId}.`,
      })
      props.onComplete()
    } catch (error) {
      toast.push({
        status: 'error',
        title: 'Strategic release blocked',
        description: error instanceof Error ? error.message : 'The family could not be validated.',
      })
    } finally {
      setIsPublishing(false)
    }
  }, [client, currentUser, props, toast])

  return {
    label: isPublishing ? 'Publishing approved family…' : 'Publish approved family',
    tone: 'positive',
    disabled: isPublishing || !props.draft,
    onHandle: () => void onHandle(),
  }
}
