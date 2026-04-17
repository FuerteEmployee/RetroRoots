# Flexicore CMS Backend

## Setup

1. `npm install`
2. Copy `.env.example` to `.env` and fill in values
3. `node seed.js` — Creates default admin user
4. `npm run dev` — Start development server

## Default Admin
- Email: admin@flexicore.in
- Password: admin123

## API Endpoints

| Module | Endpoint | Methods |
|--------|----------|---------|
| Auth | /api/auth/login, /register, /me | POST, GET |
| Dashboard | /api/dashboard | GET |
| Products | /api/products | GET, POST, PUT, DELETE |
| Categories | /api/categories | GET, POST, PUT, DELETE |
| Blogs | /api/blogs | GET, POST, PUT, DELETE |
| Daily Updates | /api/daily-updates | GET, POST, PUT, DELETE |
| Distributors | /api/distributors | GET, POST, PUT, DELETE |
| Enquiries | /api/enquiries | GET, POST, PUT, DELETE |
| Enquiry Export | /api/enquiries/export/csv | GET |
| Team | /api/team | GET, POST, PUT, DELETE |
| Gallery | /api/gallery | GET, POST, PUT, DELETE |
| Certificates | /api/certificates | GET, POST, PUT, DELETE |
| Expos | /api/expos | GET, POST, PUT, DELETE |
| Press | /api/press | GET, POST, PUT, DELETE |
| Trusted By | /api/trusted-by | GET, POST, PUT, DELETE |
| Careers | /api/careers | GET, POST, PUT, DELETE |
| Settings | /api/settings | GET, PUT |
| SEO | /api/seo | GET, POST, PUT, DELETE |
| Upload | /api/upload/image, /images | POST |

All POST/PUT/DELETE routes (except enquiries POST & auth) require JWT token in `Authorization: Bearer <token>` header.
