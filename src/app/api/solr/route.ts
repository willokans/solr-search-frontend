import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const company_name = searchParams.get('company_name');
  const address = searchParams.get('address');
  const budget = searchParams.get('budget');
  const product = searchParams.get('product');
  const banker = searchParams.get('banker');

  // Build Solr query using OR for all fields
  let queryParts: string[] = [];
  if (company_name) queryParts.push(`company_name:${company_name}*`);
  if (address) queryParts.push(`address:${address}*`);
  if (budget) queryParts.push(`budget:${budget}`);
  if (product) queryParts.push(`product:${product}*`);
  if (banker) queryParts.push(`banker:${banker}*`);

  let solrQuery = queryParts.length > 0 ? queryParts.join(' OR ') : '*:*';
  let solrUrl = `http://localhost:8983/solr/companies/select?indent=true&q.op=OR&q=${encodeURIComponent(solrQuery)}`;

  try {
    const response = await fetch(solrUrl);
    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch from Solr', details: error }), { status: 500 });
  }
}
