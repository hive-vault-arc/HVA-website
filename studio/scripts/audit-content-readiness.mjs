import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-08-10'}).withConfig({perspective: 'raw'})
const localizedTypes = [
  'post',
  'newsArticle',
  'perspective',
  'researchReport',
  'caseStudy',
  'employeeProfile',
  'capability',
  'industry',
  'pageOptimization',
]
const answerTypes = [
  'post',
  'newsArticle',
  'perspective',
  'researchReport',
  'caseStudy',
  'capability',
  'pageOptimization',
]

const report = await client.fetch(
  `{
    "publishedApproved": count(*[_type in $localizedTypes && !(_id in path("drafts.**")) && translationStatus == "approved"]),
    "missingSeo": *[_type in $localizedTypes && !(_id in path("drafts.**")) && translationStatus == "approved" && (!defined(seo.title) || !defined(seo.description))]{_id, _type, language},
    "noindexed": *[_type in $localizedTypes && !(_id in path("drafts.**")) && translationStatus == "approved" && seo.noIndex == true]{_id, _type, language},
    "answersWithoutEvidence": *[_type in $answerTypes && defined(directAnswer) && (evidenceType in ["external-research", "first-party-research"] || directAnswer match "*[0-9]*") && count(answerEvidence) == 0]{_id, _type, language},
    "nativeReviewMissing": *[_type in $localizedTypes && !(_id in path("drafts.**")) && language in ["fr", "es", "ar"] && translationStatus == "approved" && nativeReview.reviewed != true]{_id, _type, language},
    "unverifiedEvidence": *[_type == "evidenceRecord" && verificationStatus != "verified"]{_id, claimId, verificationStatus},
    "publicEvidenceInvalid": *[
      _type == "evidenceRecord" && publiclyCitable == true &&
      (
        verificationStatus != "verified" ||
        !defined(sourceTitle) ||
        !defined(sourceUrl) ||
        !defined(publisher) ||
        !defined(publicationDate) ||
        !defined(reviewer) ||
        !defined(reviewedAt) ||
        (defined(expiresAt) && dateTime(expiresAt + "T23:59:59Z") < dateTime(now()))
      )
    ]{_id, claimId},
    "organizationProfile": *[_id == "organizationProfile"][0]{_id, approvedForPublicUse, reviewedBy, reviewedAt}
  }`,
  {localizedTypes, answerTypes},
)

console.log(JSON.stringify(report, null, 2))

if (report.publicEvidenceInvalid.length) {
  throw new Error('Evidence marked for public use failed the verification gate.')
}

console.log('Content-readiness audit completed without mutating the dataset.')
