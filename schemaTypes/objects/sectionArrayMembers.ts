import {defineArrayMember} from 'sanity'

export const sectionArrayMembers = [
  defineArrayMember({type: 'paragraphSection'}),
  defineArrayMember({type: 'headingSection'}),
  defineArrayMember({type: 'subheadingSection'}),
  defineArrayMember({type: 'pullquoteSection'}),
  defineArrayMember({type: 'statBlockSection'}),
  defineArrayMember({type: 'listSection'}),
  defineArrayMember({type: 'faqSection'}),
]
