import { http, HttpResponse } from 'msw';

let mockUsers = [
  { id: '1', name: 'John Doe', role: 'admin', lastLogin: '2024-03-15T10:00:00Z' },
  { id: '2', name: 'Jane Smith', role: 'user', lastLogin: '2024-03-14T15:30:00Z' },
  { id: '3', name: 'Bob Johnson', role: 'viewer', lastLogin: '2024-03-13T09:20:00Z' },
];

const mockAssets = [
  { id: '1', name: 'Web Server', status: 'active', owner: 'DevOps Team' },
  { id: '2', name: 'Database', status: 'active', owner: 'Backend Team' },
  { id: '3', name: 'API Gateway', status: 'maintenance', owner: 'Infrastructure' },
];

let mockFindings = [
  { id: '1', title: 'SQL Injection', severity: 'critical', status: 'open', assetId: '1' },
  { id: '2', title: 'XSS Vulnerability', severity: 'high', status: 'open', assetId: '2' },
  { id: '3', title: 'Weak Password', severity: 'medium', status: 'resolved', assetId: '3' },
];

export const handlers = [
  http.get('/api/users', () => {
    console.log('[MSW] Intercepted GET /api/users');
    return HttpResponse.json(mockUsers);
  }),

  http.get('/api/assets', () => {
    console.log('[MSW] Intercepted GET /api/assets');
    return HttpResponse.json(mockAssets);
  }),

  http.get('/api/assets/:id', ({ params }) => {
    console.log('[MSW] Intercepted GET /api/assets/:id', params['id']);
    const asset = mockAssets.find(a => a.id === params['id']);
    if (!asset) return new HttpResponse(null, { status: 404 });

    return HttpResponse.json({
      ...asset,
      vulnerabilities: [
        { id: 'v1', severity: 'high', description: 'Outdated package version' },
        { id: 'v2', severity: 'medium', description: 'Missing security headers' },
      ]
    });
  }),

  http.get('/api/findings', () => {
    console.log('[MSW] Intercepted GET /api/findings');
    return HttpResponse.json(mockFindings);
  }),

  http.get('/api/dashboard/stats', () => {
    console.log('[MSW] Intercepted GET /api/dashboard/stats');
    return HttpResponse.json({
      totalUsers: mockUsers.length,
      totalAssets: mockAssets.length,
      activeAssets: mockAssets.filter(a => a.status === 'active').length,
      openFindings: mockFindings.filter(f => f.status === 'open').length,
      criticalFindings: mockFindings.filter(f => f.severity === 'critical').length,
    });
  }),

  http.get('/api/settings', () => {
    console.log('[MSW] Intercepted GET /api/settings');
    return HttpResponse.json({
      theme: 'light',
      language: 'en',
      notifications: true,
      autoRefresh: true,
    });
  }),

  http.delete('/api/users/:id', ({ params }) => {
    const userId = params['id'] as string;
    console.log('[MSW] Intercepted DELETE /api/users/' + userId);
    const deletedUser = mockUsers.find(u => u.id === userId);
    if (!deletedUser) {
      return new HttpResponse(null, { status: 404 });
    }
    mockUsers = mockUsers.filter(u => u.id !== userId);
    return HttpResponse.json(deletedUser);
  }),

  http.patch('/api/findings/:id', async ({ params, request }) => {
    const findingId = params['id'] as string;
    console.log('[MSW] Intercepted PATCH /api/findings/' + findingId);
    const finding = mockFindings.find(f => f.id === findingId);
    if (!finding) {
      return new HttpResponse(null, { status: 404 });
    }
    const updates = await request.json() as Partial<typeof finding>;
    Object.assign(finding, updates);
    console.log('[MSW] Updated finding:', finding);
    return HttpResponse.json(finding);
  }),
];
