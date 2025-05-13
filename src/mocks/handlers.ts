import { http, HttpResponse } from 'msw';

const interests = ['Музика', 'Спорт', 'Игри', 'Танци'];

export const handlers = [
  http.get('/api/interests', () => {
    return HttpResponse.json(interests);
  }),

  http.post('/api/register', async ({ request }) => {
    const body = await request.json();
    console.log('Submitted data:', body);
    return HttpResponse.json({ success: true });
  }),
];