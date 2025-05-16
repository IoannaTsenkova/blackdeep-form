import { http, HttpResponse } from 'msw';

const interests = ['Sports', 'Music', 'Dancing', 'Games'];

export const handlers = [
  http.get('/api/interests', () => {
    return HttpResponse.json(interests);
  }),

 http.post("/api/register", async ({ request }) => {
  const body = await request.formData();
  console.log("📥 MOCK REGISTER:", Object.fromEntries(body.entries()));
  return HttpResponse.json({ success: true });
})
];