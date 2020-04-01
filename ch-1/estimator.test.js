/**
 * @jest-environment node
 */
import{onCovid19}from"on-covid-19";import estimator from"../../src/estimator.js";import{getImpactDataStructure,valueOnFields,mockEstimationFor}from"../utils.js";

console.log(typeof estimator, estimator);

describe("on-covid-19 > Challenge-1",()=>{test("estimate current and projected infections, in days",async()=>{const t=await mockEstimationFor("days"),{data:e,estimate:a}=t.data,{periodType:i,timeToElapse:o}=e,c=await onCovid19(e,estimator).estimateImpactAfter(o)[i]();expect(c).toBeTruthy(),expect(c).toMatchObject(getImpactDataStructure());valueOnFields(c,a,["currentlyInfected","infectionsByRequestedTime"]).forEach(([t,e])=>{expect(t).toBe(e)})}),test("estimate current and projected infections, in weeks",async()=>{const t=await mockEstimationFor("weeks"),{data:e,estimate:a}=t.data,{periodType:i,timeToElapse:o}=e,c=await onCovid19(e,estimator).estimateImpactAfter(o)[i]();expect(c).toBeTruthy(),expect(c).toMatchObject(getImpactDataStructure());valueOnFields(c,a,["currentlyInfected","infectionsByRequestedTime"]).forEach(([t,e])=>{expect(t).toBe(e)})}),test("estimate current and projected infections, in months",async()=>{const t=await mockEstimationFor("months"),{data:e,estimate:a}=t.data,{periodType:i,timeToElapse:o}=e,c=await onCovid19(e,estimator).estimateImpactAfter(o)[i]();expect(c).toBeTruthy(),expect(c).toMatchObject(getImpactDataStructure());valueOnFields(c,a,["currentlyInfected","infectionsByRequestedTime"]).forEach(([t,e])=>{expect(t).toBe(e)})})});
