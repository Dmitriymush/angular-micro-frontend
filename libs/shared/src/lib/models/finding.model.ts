export interface Finding {
  id: string;
  assetId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  status: 'open' | 'resolved';
}
