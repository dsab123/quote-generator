import { Quote } from "../types";
const faunadb = require('faunadb');
const faunaClient = new faunadb.Client({ secret: 'fnAEEoeNk9ACCByK2pV1sS-PFtowwJZF_XRvR2wA' });
// todo daniel move the secret to env.local
const q = faunadb.query;

export const myFaunaClient = {
    getQuote: async (): Promise<Quote> => {
        const quote = await faunaClient.query(
        q.Map(
            q.Paginate(q.Match(q.Index('author')), {size: 1}),
            q.Lambda('x', q.Get(q.Var('x')))
        ));

        return {
            id: quote.data[0].data.id,
            author: quote.data[0].data.author,
            quote: quote.data[0].data.quote
        }
    },

    fetchQuotes: async (): Promise<Array<Quote>> => {
        const quotesRaw = await faunaClient.query(
            q.Map(
                q.Paginate(q.Match(q.Index('author')), {size: 100}),
                q.Lambda('x', q.Get(q.Var('x')))
            )) as {data: Array<{data: Quote}>};

        return quotesRaw.data.map((x: { data: Quote }) => ({
            id: x.data.id,
            author: x.data.author,
            quote: x.data.quote
        }));
    }
}