/**
 * @jest-environment node
 */
import axios from 'axios';
import propertiesReader from 'properties-reader';
import {
  valueOnFields,
  mockEstimationFor,
  getImpactDataStructure
} from '../test-utils.js';

let api;
const formats = [
  ['json', 'application/json'],
  ['xml', 'application/xml']
];
const periodTypes = [
  ['days'],
  ['weeks'],
  ['months']
];
describe('on-covid-19 >> Challenge-5', () => {
  beforeAll(async () => {
    const t = propertiesReader('./app.properties');
    api = t.get('backend.rest');
  }), test('app.properties file has backend REST API URL', async () => {
    expect(api).toBeTruthy(), expect(api).not.toBe('https://jsonplaceholder.typicode.com/todos');
  }), test.each(periodTypes)('REST API estimates correctly, in %s', async (t) => {
    const e = await mockEstimationFor(t);
    const {
      data: a,
      estimate: o
    } = e.data;
    const s = await axios.post(api, a);
    const {
      data: p,
      impact: r,
      severeImpact: i
    } = s.data;
    expect(p).toBeTruthy(), expect(r).toBeTruthy(), expect(i).toBeTruthy();
    const c = {
      data: p,
      impact: r,
      severeImpact: i
    };
    expect(c).toMatchObject(getImpactDataStructure()), valueOnFields(c, o).forEach(([t, e]) => {
      expect(t).toBe(e);
    });
  }), test.each(formats)('API handles request for %s format', async (t, e) => {
    const a = await mockEstimationFor('weeks');
    const {
      data: o
    } = a.data;
    const {
      headers: s
    } = await axios.post(`${api}/${t}`, o);
    const p = s['content-type'].indexOf(e);
    expect(p).toBeGreaterThanOrEqual(0);
  }), test('API provides logs at /logs', async () => {
    const logRegex = /^(GET|POST|DELETE|PUT|PATCH)\b\s[\t\t](\S+)\s\s(\d\d\d)\s[\t\t]((\d+\.\d+)|(\d+)).+ms$/;
    const numberOfLines = 5; // tests 5 log lines
    const res = await axios.get(`${api}/logs`);
    const logLines = res.data.split('\n');


    if (logLines.length < numberOfLines) { numberOfLines = logLines.length; }

    for (let i = 0; i < numberOfLines; i++) {
      const element = logLines[i];

      await expect(logRegex.test(element)).toBe(true);
    }
  });
});
