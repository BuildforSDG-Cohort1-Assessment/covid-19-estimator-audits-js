/**
 * @jest-environment node
 */
import axios from"axios";import propertiesReader from"properties-reader";import{valueOnFields,countLogEntries,mockEstimationFor,indexOfContentType,getImpactDataStructure}from"../test-util
s.js";let api;const formats=[["json","application/json"],["xml","application/xml"]],periodTypes=[["days"],["weeks"],["months"]];describe("on-covid-19 >> Challenge-5",()=>{beforeAll(async(
)=>{const t=propertiesReader("./app.properties");api=t.get("backend.rest")}),test("app.properties file has backend REST API URL",async()=>{expect(api).toBeTruthy(),expect(api).not.toBe("h
ttps://jsonplaceholder.typicode.com/todos")}),test.each(periodTypes)("REST API estimates correctly, in %s",async t=>{const e=await mockEstimationFor(t),{data:a,estimate:o}=e.data,s=await 
axios.post(api,a),{data:i,impact:p,severeImpact:r}=s.data;expect(i).toBeTruthy(),expect(p).toBeTruthy(),expect(r).toBeTruthy();const n={data:i,impact:p,severeImpact:r};expect(n).toMatchOb
ject(getImpactDataStructure()),valueOnFields(n,o).forEach(([t,e])=>{expect(t).toBe(e)})}),test.each(formats)("API handles request for %s format",async(t,e)=>{const a=await mockEstimationF
or("weeks"),{data:o}=a.data,s=await axios.post(`${api}/${t}`,o),i=indexOfContentType(s,e);expect(i).toBeGreaterThanOrEqual(0)}),test("API provides plain text logs at /logs",async()=>{cons
t{data:t}=await axios.get(`${api}/logs`,{responseType:"text"}),e=countLogEntries(t),a=await mockEstimationFor("weeks"),{data:o}=a.data;await axios.post(`${api}`,o),await axios.post(`${api
}/json`,o),await axios.post(`${api}/xml`,o);const{headers:s,data:i}=await axios.get(`${api}/logs`,{responseType:"text"}),p=indexOfContentType(s,"text/plain");expect(p).toBeGreaterThanOrEq
ual(0);const r=countLogEntries(i);expect(r).toBeGreaterThanOrEqual(e+3)})});