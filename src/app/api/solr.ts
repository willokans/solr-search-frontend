import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { company_name } = req.query;
  let solrUrl = 'http://localhost:8983/solr/companies/select?indent=true&q.op=OR&q=*%3A*';

  // If searching for company_name, build a query
  if (company_name && typeof company_name === 'string' && company_name.length > 0) {
    solrUrl = `http://localhost:8983/solr/companies/select?indent=true&q.op=OR&q=company_name:${encodeURIComponent(company_name)}*`;
  }

  try {
    const response = await fetch(solrUrl);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from Solr', details: error });
  }
}
