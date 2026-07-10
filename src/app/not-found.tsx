import NotFoundContent from '../components/NotFoundContent';
import { NOT_FOUND_METADATA } from '../lib/not-found';

export const metadata = NOT_FOUND_METADATA;

export default function NotFound() {
  return <NotFoundContent />;
}
