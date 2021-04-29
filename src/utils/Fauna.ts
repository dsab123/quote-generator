import { Quote } from "types";
const faunadb = require('faunadb');
const faunaClient = new faunadb.Client({ secret: 'fnAEEoeNk9ACCByK2pV1sS-PFtowwJZF_XRvR2wA' });
// todo daniel move the secret to env.local
const q = faunadb.query;

export const myFaunaClient = {
    fetchQuotes: async (): Promise<Array<Quote>> => {
        const quotesRaw = await faunaClient.query(
            q.Map(
                q.Paginate(q.Match(q.Index('author')), {size: 100}),
                q.Lambda('x', q.Get(q.Var('x')))
            )) as {data: Array<{data: Quote}>};

        return quotesRaw.data.map((x: { data: Quote }) => ({
            id: x.data.id,
            author: x.data.author,
            quote: x.data.quote,
            
            // I'm not sure how to avoid adding these props into the quote object; I don't want to create a fauna quote hybrid, and I don't
            // wanna use a factory pattern...
            isItalics: false,
            isBold: false,
            isUnderlined: false
        }));
    }
}