import { useLocation } from 'react-router-dom';

export default function URLSplitter() {
  const pathName = useLocation().pathname.split('/');
  pathName.shift();
  return pathName;
}
