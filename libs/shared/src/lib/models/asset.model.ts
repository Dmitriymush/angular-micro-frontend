export interface Vulnerability {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
}

export interface Asset {
  id: string;
  name: string;
  status: string;
  owner: string;
}

export interface AssetWithVulnerabilities extends Asset {
  vulnerabilities: Vulnerability[];
}
