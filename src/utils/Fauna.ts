import { CreateQuote } from './QuoteFactory';
import { Quote } from "types";
const faunadb = require('faunadb');
const faunaClient = new faunadb.Client({ secret: `${process.env.REACT_APP_FAUNA_API_KEY}` });
const q = faunadb.query;

export const myFaunaClient = {
    fetchQuotes: async (): Promise<Array<Quote>> => {
        const quotesRaw = await faunaClient.query(
            q.Map(
                q.Paginate(q.Match(q.Index('author')), {size: 100}),
                q.Lambda('x', q.Get(q.Var('x')))
            )) as {data: Array<{data: Quote}>};

        return quotesRaw.data.map((x: { data: Quote }) => ({
            ...CreateQuote(x.data.id, x.data.author, x.data.quote)
        }));
    }
}