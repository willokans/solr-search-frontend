# Solr Search Frontend

This project is a demo Next.js frontend for searching and submitting records to an Apache Solr server. It features a single-page form with search suggestions powered by Solr, styled with Tailwind CSS.

## Features

- Search for company records from Solr with autocomplete suggestions
- Form fields: company name, address, budget, product, banker
- Cancel button to clear all fields
- Submit button with success toast notification
- Next.js API route proxies requests to Solr to avoid CORS issues

## How to Run

1. **Clone the repository:**

   ```zsh
   git clone https://github.com/<your-username>/solr-search-frontend.git
   cd solr-search-frontend
   ```

2. **Install dependencies:**

   ```zsh
   npm install
   ```

3. **Start your Solr server locally** (make sure it is running and accessible at `http://localhost:8983/solr/corename/select`)

4. **Run the Next.js development server:**

   ```zsh
   npm run dev
   ```

5. **Open your browser and visit:**

   [http://localhost:3000](http://localhost:3000)

## Demo Video

This repo is used in my YouTube video about Solr. Clone the repo and follow along to see how you can search and display Solr records on the frontend.

---

Feel free to open issues or pull requests if you have questions or suggestions!
