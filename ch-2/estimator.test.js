/**
 * @jest-environment node
 */
import{onCovid19}from"on-covid-19";import estimator from"../../src/estimator.js";import{getImpactDataStructure,valueOnFields,mockEstimationFor}from"../test-utils.js";const cases=[["days","ch-2"],["weeks","ch-2"],["months","ch-2"]];describe("on-covid-19 >> Challenge-2",()=>{test.each(cases)("estimate severe cases and impact on bed availability, in %s",async(t,e)=>{const a=await mockEstimationFor(t),{data:o,estimate:s}=a.data,{periodType:i,timeToElapse:c}=o,m=await onCovid19(o,estimator).estimateImpactAfter(c)[i]();expect(m).toBeTruthy(),expect(m).toMatchObject(getImpactDataStructure(e)),valueOnFields(m,s,e).forEach(([t,e])=>{expect(t).toBe(e)})})});
 