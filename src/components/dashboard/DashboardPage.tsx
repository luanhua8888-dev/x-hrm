import { useNavigate } from 'react-router-dom';

import { DashboardView } from './DashboardView';

export default function DashboardPage() {
  const navigate = useNavigate();
  return <DashboardView go={(path) => void navigate(path)} />;
}
