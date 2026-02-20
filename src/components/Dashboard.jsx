"use client";

import { useState, useMemo, useEffect } from "react";

// GCX base URL for deep links
var GCX="https://highnote.guidecx.com/app/projects/";
var MS={
  "7cfa08d5-1dea-41aa-8425-b1c2ed032a83":{
    "MC Preparation":"c6206138-1fc6-46ba-a5ac-05b981723c97",
    "Mastercard Preparation":"c6206138-1fc6-46ba-a5ac-05b981723c97",
    "NEX Preparation":"bbcb3110-b06b-43d8-8280-70612f125699",
    "Ops Prep":"6dfe98b2-a3b2-4114-8b2e-09d16d7a08f2",
    "Phase 1":"41a7a34a-ec59-43e7-a0e1-2b5c64778dc9",
  },
  "e99c8ce5-ad35-4a8a-92ea-41d9414ba7c1":{
    "Digital Wallet Cards":"f23f4a1f-f775-452a-b8d1-c5483a4dc784",
    "Collateral and Policies":"9e049149-cd3b-408a-a3ef-358f4c17d4ac",
    "System Configuration":"589625a4-f584-4236-b609-b4ba4a614667",
    "Testing":"375703d8-9a04-4aad-94df-bc8f7962a704",
    "Launch Readiness":"6705c818-b2cc-42d5-a995-de16ca6c0a20",
    "CRB":"98d799d2-2aed-4f52-ae8a-8bbadc6e0b19",
  },
  "48cfccd4-15fc-42b0-bc19-ea05970be555":{
    "CRB":"ceafbdfc-ea04-4b3a-b460-25d712abf312",
    "Testing":"6ff4a881-f3c1-41a2-a350-0dcd6332d079",
    "Launch Readiness":"7dcac8b6-183a-483e-89f3-6826d8f9ad27",
    "Policies and Procedures":"cb7686dc-d91d-4279-8f67-ad9430f402fd",
  },
  "86e695c2-855b-4ebf-be32-ba789f10ac70":{
    "Policies and Procedures":"65cc0dda-bcfa-49c6-9234-2cdfbe8c4ed0",
    "Program Collateral":"bf8d4ea4-0afd-4646-b620-3ae0c50d1eaf",
    "Technical Implementation":"71657126-3471-415b-b028-28ca23533adc",
    "Transpecos Bank":"5fff491a-8482-45b2-9f9f-85b791686d5a",
  },
  "378d9053-f82c-49ee-b11f-abe4ef9af528":{
    "Network Onboarding":"ea777102-b85a-4aea-bb6f-d9b9405caafe",
    "Pre-Implementation":"1e84b508-ee4a-4cab-8fd8-67dac295931d",
    "Payment Operations":"bf152475-dea4-42c3-bbb6-fe73c679c894",
    "Engineering":"c9867ebf-6bd4-49f8-adb2-0f23bc3dde42",
  },
  "c8401a72-655b-4093-b9fc-dc42947ea528":{
    "Testing":"a7a69443-e1f6-46cf-8b97-02b07992bf5a",
    "Post Sales":"6b61b145-2776-4588-afce-e25223c0a309",
    "Celtic":"3818b292-504e-4e7a-b6e4-f70ef0c859de",
  },
  "04b6574e-9173-4f61-b706-988798ace2dd":{
    "CRB":"52adc854-e4c9-4266-bc63-33beafc80cc1",
    "Consumer Credit":"47b7780a-7f21-4e10-8dc0-18feb14f7a8a",
    "Post Sales":"c80c5032-f872-473d-9744-ec155db2eecf",
    "Program Collateral":"9356c773-5526-41fb-8766-c7ff33a1ba70",
    "System Configuration":"56c2f9b2-df8c-4c04-8d12-bfcc0e1190c6",
    "Testing":"9ba6f546-38fa-47c9-b401-c6e0e44be998",
    "Tag Physical Cards":"0c9b3280-4f19-44a6-839a-c3c92b3dba12",
    "Technical Implementation":"0e239dd7-e59a-4e68-b98b-b818f8133b73",
  },
  "60a6c258-954c-45ee-8878-bba6542eefe1":{
    "CRB":"7234d079-5d79-4a3b-ad48-a8a52c905dcf",
    "Policies and Procedures":"0ef471e9-51e0-4e72-9628-5c5b814488f7",
    "System Configuration":"6a17edd3-ba0b-4234-896a-b3d8656cb68e",
    "Program Collateral":"a3cc8c1e-7562-4217-b4a9-db610fab1dd8",
  },
  "ecfd472d-f7ef-4863-86be-71d1d5e9bdff":{
    "Post Sales":"8803354e-5ed5-46f6-90d5-c902800edb34",
    "CRB":"44376307-5a13-4cb6-9efc-87afd286ae16",
    "Due Diligence":"792b5dad-3a51-416d-93d5-95d0f1ec3180",
    "System Configuration":"3cb00ad9-ec33-4770-a740-d5df726b6c36",
    "Technical Implementation":"2ff20d19-f59b-4650-81cd-dc36d67c5f58",
    "Launch Readiness":"476b5854-b937-4f92-877d-bdd0c603d926",
    "Testing":"f6655907-97c0-42c0-b0b6-7773cae769e6",
    "Program Collateral":"be07e3ad-493f-4b97-bed1-38beb25322bb",
    "Policies and Procedures":"c476648d-61f8-4be1-970b-5d8af6febc01",
  },
  "69d2416f-7537-4062-80d8-b937f204c4bc":{
    "Due Diligence":"506c52bc-6472-456e-8c44-017d7a4b556e",
    "Post Sales":"b449c533-0e5b-4ae4-bd34-19295b58e526",
    "Kickoff":"67441178-b46a-4647-a1ba-bf0ee08fd732",
    "Onboarding":"08c49a04-1ff9-42fd-bfcf-6a34a4fccc78",
  },
  "9e2b0067-dfc2-430a-8318-a6b0f7567bb2":{
    "Post Sales":"0930917e-4ac2-4fe7-b211-f1da5bd8469d",
    "Due Diligence":"3bec2b9d-0f7d-4f0f-8dc9-7d7df653bfe8",
    "CRB":"460ccea7-8e52-4a9e-869f-d51725a9a001",
    "Technical Implementation":"bb8a96e0-34be-4c64-836f-68152146c28f",
    "Launch Readiness":"0270345e-cd2d-4541-b47d-ca03dc9752d8",
    "Policies and Procedures":"405b8e36-1c00-439d-9713-7f006c163217",
    "System Configuration":"fb8b9653-5cec-43b4-be0b-1db77bc5061f",
    "Testing":"1c25e4f3-20eb-4f55-bceb-71626a4dac18",
  },
};

// Task builder: n=name, r=resp, s=status, x=extras (m=milestone, a=assignee, due/date, tid=taskId)
var T=function(n,r,s,x){return Object.assign({n:n,r:{I:"INTERNAL",C:"CUSTOMER",T:"THIRD_PARTY",M:"MIXED"}[r||"I"]||"INTERNAL",s:s},x||{});};

var P=[
{id:"mc",name:"Mastercard Cloud Edge",status:"LATE",pm:"Katie Hamm",pid:"7cfa08d5-1dea-41aa-8425-b1c2ed032a83",done:[],stuck:[],
  wip:[T("Request additional MC resources","I","WORKING_ON_IT",{m:"MC Preparation",due:"overdue",tid:"8568b7a3-dc2b-4eb1-8a3f-9443bce809c5"}),T("Communicate Scope","I","WORKING_ON_IT",{m:"MC Preparation",due:"overdue",tid:"0c742736-6eed-44d8-bb02-581a9163949a"}),T("Coordination with NEX","I","WORKING_ON_IT",{m:"MC Preparation",due:"overdue",tid:"8760f214-990b-4c24-b81b-a076612e7800"}),T("Coordination with MC","I","WORKING_ON_IT",{m:"NEX Preparation",due:"overdue",tid:"7e4ab5b1-f332-4438-9550-44e74689bd3e"}),T("Communicate Scope","I","WORKING_ON_IT",{m:"NEX Preparation",due:"overdue",tid:"ce3b8ab4-d429-449e-95dc-183a26736c90"}),T("Request additional NEX resources","I","WORKING_ON_IT",{m:"NEX Preparation",due:"overdue",tid:"f31d9a9a-518d-4637-b37c-500f48e5a279"}),T("HN Project Plan sign off","I","WORKING_ON_IT",{m:"NEX Preparation",due:"overdue",tid:"6eac4495-c155-4c46-8669-363acc5cf051"}),T("Ensure NGOM/MCOM access","I","WORKING_ON_IT",{m:"Ops Prep",due:"overdue",tid:"9e48a176-58b8-4621-a978-4cb6c3c22f88"})],
  up:[T("Cut Over ICA 32216","I","NOT_STARTED",{m:"Phase 1",due:"Feb 19",tid:"7a654233-c7b2-4ee2-a19a-f71b4343ccdc"}),T("Cut Over ICA 33097","I","NOT_STARTED",{m:"Phase 1",due:"Feb 19",tid:"236e5bea-5ee0-4507-9486-5bb508e97e66"}),T("Cut Over ICA 33291","I","NOT_STARTED",{m:"Phase 1",due:"Feb 19",tid:"cc3ece7b-3b8f-4bc2-8037-c80f2f8cf1d4"}),T("Cut Over ICA 33290","I","NOT_STARTED",{m:"Phase 1",due:"Feb 19",tid:"fbe86e37-f2b6-4721-85c8-cb43224a2562"}),T("Cut Over ICA 33289","I","NOT_STARTED",{m:"Phase 1",due:"Feb 19",tid:"d394bf39-31fe-41ca-8d57-e4cce5bfd3c0"})]},
{id:"roadflex",name:"Roadflex",status:"LATE",pm:"Kate Murphey",pid:"e99c8ce5-ad35-4a8a-92ea-41d9414ba7c1",done:[],stuck:[],
  wip:[T("Submit Digital Wallet Items","I","WORKING_ON_IT",{m:"Digital Wallet Cards",a:"Kate M.",tid:"551eddb5-7ed7-409b-a35e-c160d4d20aca"}),T("Collateral Review","I","WORKING_ON_IT",{m:"Collateral and Policies",a:"Kate M.",tid:"92ef5ad5-5f13-4fac-8cf9-b1611639ca7a"})],
  up:[T("Create Card Profile","I","NOT_STARTED",{m:"System Configuration",a:"Kate M.",due:"Feb 25",tid:"4d65fdc9-1cb3-46c6-b665-2fe6fcfe8a1c"}),T("Configure Product","I","NOT_STARTED",{m:"System Configuration",a:"Kate M.",due:"Feb 24",tid:"73bb3494-6023-483b-9b65-8e496560ae5e"}),T("System Config Complete","I","NOT_STARTED",{m:"System Configuration",a:"Jody S.",due:"Feb 25",tid:"306ac612-f678-45f0-acfb-d4e85b7d35ce"}),T("Testing approval","I","NOT_STARTED",{m:"Testing",a:"Kate M.",due:"Feb 24",tid:"bdcb82d7-fb9e-414b-8e24-b07df8a2eaba"}),T("Request test funds","I","NOT_STARTED",{m:"Testing",a:"Kate M.",due:"Feb 26",tid:"91b011b8-1bac-43fa-85af-dc3d76b738ef"}),T("Final Collateral filed","I","NOT_STARTED",{m:"Launch Readiness",a:"Kate M.",due:"Feb 23",tid:"208974a3-ab85-4139-8057-bb9ebf11d889"}),T("Final Policies filed","I","NOT_STARTED",{m:"Launch Readiness",a:"Kate M.",due:"Feb 23",tid:"00019c84-5af5-4420-b877-145b8c817dfe"}),T("CRB Board Approval","I","NOT_STARTED",{m:"CRB",a:"Kate M.",due:"Feb 23",tid:"8101ab1d-2ff5-4ae2-8d82-be8612da1b2a"}),T("CRB Monday Board","I","NOT_STARTED",{m:"CRB",a:"Kate M.",due:"Feb 23",tid:"4da48d69-72f9-4bcd-bc2c-afa5ac026b82"}),T("Bank Funds Flow","I","NOT_STARTED",{m:"CRB",a:"Kate M.",due:"Feb 25",tid:"7ff0d1d8-f724-4720-80cc-90f183335bfe"}),T("Account Opening CRB","I","NOT_STARTED",{m:"CRB",a:"Kate M.",due:"Feb 23",tid:"66f29713-6eba-4e97-a922-1bb4c0ed4106"}),T("PayOps Bank accts","I","NOT_STARTED",{m:"CRB",a:"Kate M.",due:"Feb 25",tid:"f545b943-4be4-4e13-8d5d-c736ab0c23c9"})]},
{id:"paysurge",name:"PaySurge",status:"LATE",pm:"Mary Boomsma",pid:"",done:[T("PayOps funding","I","DONE",{date:"Jan 27"}),T("System Config","I","DONE",{date:"Feb 17"}),T("Testing Funds","I","DONE",{date:"Feb 17"})],stuck:[],wip:[T("5 in progress","M","WORKING_ON_IT")],up:[]},
{id:"mtl",name:"MTL Project",status:"LATE",pm:"Katie Hamm",pid:"",done:[],stuck:[],wip:[T("4 tasks (all overdue)","I","WORKING_ON_IT",{due:"overdue"})],up:[]},
{id:"runa",name:"Runa",status:"LATE",pm:"Joe Benscoter",pid:"",done:[T("Testing wind down","I","DONE",{date:"Feb 17"}),T("Rewards Approval","I","DONE",{date:"Feb 17"}),T("CHA update","I","DONE",{date:"Feb 17"})],stuck:[],wip:[T("4 in progress (1 overdue)","I","WORKING_ON_IT",{due:"1 overdue"})],up:[]},
{id:"svb",name:"SVB Implementation",status:"LATE",pm:"Katie Hamm",pid:"",done:[],stuck:[],wip:[T("3 tasks (2 overdue)","I","WORKING_ON_IT",{due:"overdue"})],up:[]},
{id:"ferry",name:"Ferry - CRB Issuing",status:"LATE",pm:"Kate Murphey",pid:"",done:[],stuck:[],wip:[],up:[]},
{id:"skux",name:"SKUx Disaster CR",status:"LATE",pm:"Kate Murphey",pid:"",done:[],stuck:[],wip:[T("2 overdue","I","WORKING_ON_IT",{due:"overdue"})],up:[]},
{id:"splitit",name:"SplitIt - Acquiring",status:"LATE",pm:"Kate Murphey",pid:"",done:[],stuck:[],wip:[T("1 overdue","I","WORKING_ON_IT",{due:"overdue"})],up:[]},
{id:"fillip",name:"Fillip Fleet",status:"LATE",pm:"Kate Murphey",pid:"48cfccd4-15fc-42b0-bc19-ea05970be555",
  done:[T("Assign BIN Range","I","DONE",{m:"CRB",date:"Feb 18",tid:"5ac589c2-44c4-4968-9bc7-1e1ac7234d9c"}),T("Card Proof Approved","C","DONE",{m:"CRB",date:"Feb 13",tid:"abe3d6cd-eada-4e77-8750-d4b713462bc2"}),T("Arroweye BIN Setup","I","DONE",{m:"CRB",date:"Feb 17",tid:"75f8a5b7-8399-44e1-86e3-a7bb70f5b2fc"}),T("DW Testing","C","DONE",{m:"Testing",date:"Feb 17",tid:"2fb69839-ab1a-47ee-94f6-21493325ef28"}),T("DW Live","I","DONE",{m:"Testing",date:"Feb 17",tid:"5776fffe-c6ae-41f7-bbea-71b95ad91688"})],
  stuck:[],
  wip:[T("Funds Reserves","C","WORKING_ON_IT",{m:"Testing",due:"Feb 10 !!",tid:"06593427-ac5c-4d20-91f6-94c813646704"}),T("Card Vendor Setup","I","WORKING_ON_IT",{m:"CRB",a:"Kate M.",due:"Feb 18 !!",tid:"aa9f62c2-0a91-4018-acad-0f2f4f0fde89"}),T("Spend/Velocity Rules","I","WORKING_ON_IT",{m:"Launch Readiness",a:"Kate M.",due:"Feb 19 !!",tid:"89ed0c8b-878b-4157-a088-76ec45c37b65"}),T("Finalize Collateral","I","WORKING_ON_IT",{m:"Policies and Procedures",a:"Garrett A.",due:"Feb 13 !!",tid:"3dcc9e7f-9712-4f28-a0a3-ce237ca90fc6"}),T("Fast-Track Approval","I","WORKING_ON_IT",{m:"CRB",a:"Kate M.",due:"Feb 5 !!",tid:"74d103a0-030c-4c47-b65c-ba07c39f389d"})],
  up:[T("Configure ZD","I","NOT_STARTED",{m:"Launch Readiness",a:"Marlo K.",due:"Feb 25",tid:"9099843a-8bd0-4d66-8fd8-2a1de696ee3f"}),T("Review Disputes","I","NOT_STARTED",{m:"Launch Readiness",a:"Kate M.",due:"Feb 20",tid:"209c1dd8-b96b-479c-89f7-e4db3f878e69"}),T("Disputes Email","I","NOT_STARTED",{m:"Launch Readiness",due:"Feb 25",tid:"3e7816fe-97d2-42b5-afe8-c499bcabe6eb"}),T("Physical Cards Testing","C","NOT_STARTED",{m:"Testing",due:"Feb 25",tid:"b644a99f-13b6-4702-bc37-3a9ecf4dbd2f"})]},
{id:"accessfares",name:"AccessFares (Zyzza)",status:"ON_TIME",pm:"Kate Murphey",pid:"",done:[],stuck:[],wip:[T("7 in progress (1 overdue)","M","WORKING_ON_IT",{due:"1 overdue"})],up:[T("Statements/Txn","C","NOT_STARTED",{a:"Mike B.",due:"Feb 20"})]},
{id:"apmex",name:"APMEX",status:"ON_TIME",pm:"Joe Benscoter",pid:"86e695c2-855b-4ebf-be32-ba789f10ac70",
  done:[T("Impl Kickoff","I","DONE",{m:"Technical Implementation",date:"Feb 17",tid:"46594e0c-946a-4dc0-b360-c0a708e14508"}),T("Physical Card","I","DONE",{m:"Technical Implementation",date:"Feb 17",tid:"ca602e58-872d-434e-b949-13c4f5aec462"})],
  stuck:[T("BIN Request","I","STUCK",{m:"Transpecos Bank",a:"Aditya A.",tid:"f05d7873-1913-4e27-bc8c-65df2ca986e2"})],
  wip:[T("CMS Policy","C","WORKING_ON_IT",{m:"Policies and Procedures",due:"Feb 5 !!",tid:"c574982b-baf8-4635-a5d8-aa687826cd67"}),T("Reg E/EFTA","C","WORKING_ON_IT",{m:"Policies and Procedures",due:"Jan 22 !!",tid:"4e2f0de8-d00a-4498-86f4-c028435d466d"}),T("Social Media","I","WORKING_ON_IT",{m:"Policies and Procedures",due:"Feb 5 !!",tid:"6ee3f293-af4a-4a69-ba96-32730848b7d9"}),T("KYB/CIP","C","WORKING_ON_IT",{m:"Policies and Procedures",due:"Feb 5 !!",tid:"731aa0cb-c816-4936-b499-0061e352a06f"}),T("Info Security","C","WORKING_ON_IT",{m:"Policies and Procedures",due:"Feb 5 !!",tid:"165da3cc-4813-4569-af78-0be2ec9b89b7"}),T("Cust Service","C","WORKING_ON_IT",{m:"Policies and Procedures",due:"Dec 31 !!",tid:"fbf576a3-1184-463b-917c-7d0cbd1c00c3"}),T("Change Mgmt","C","WORKING_ON_IT",{m:"Policies and Procedures",due:"Feb 5 !!",tid:"7a0225ae-ff7d-4fb7-9411-79482c472afb"}),T("Compliance Training","C","WORKING_ON_IT",{m:"Policies and Procedures",due:"Feb 5 !!",tid:"be4a0d9d-8d24-4498-b423-9b87551fedb5"}),T("Vendor Mgmt","C","WORKING_ON_IT",{m:"Policies and Procedures",due:"Jan 22 !!",tid:"804749b6-2091-4dbe-979e-066149aa6732"}),T("Ad/Marketing","C","WORKING_ON_IT",{m:"Policies and Procedures",due:"Feb 5 !!",tid:"c4c18dd6-2c49-48e2-93da-69de67d77afb"}),T("Complaints","C","WORKING_ON_IT",{m:"Policies and Procedures",due:"Feb 5 !!",tid:"1bbfbb8e-d0d5-4c4d-9de8-b16665233541"}),T("BSA/AML/OFAC","C","WORKING_ON_IT",{m:"Policies and Procedures",due:"Feb 5 !!",tid:"571ec395-1293-46aa-93f5-41f473a6258c"}),T("Red Flags","C","WORKING_ON_IT",{m:"Policies and Procedures",due:"Feb 5 !!",tid:"95e1578b-1d70-4c13-aadc-cbace41916ae"}),T("Mobile App Screens","C","WORKING_ON_IT",{m:"Program Collateral",tid:"fd455f0c-17ec-458d-b641-fe03f78c24da"}),T("Mobile App","I","WORKING_ON_IT",{m:"Technical Implementation",a:"Kevin R.",tid:"509ec77f-50f7-43e9-bb33-828882e311b2"}),T("Push Provisioning","I","WORKING_ON_IT",{m:"Technical Implementation",a:"Kevin R.",tid:"b115833b-5583-44d7-a33a-cc69bcba4249"}),T("Submit Bank Package","I","WORKING_ON_IT",{m:"Transpecos Bank",a:"Joe B.",due:"Feb 11 !!",tid:"87a000c3-2794-41c5-bea3-93a06b6b03b3"})],
  up:[T("DW Assets","C","NOT_STARTED",{m:"Program Collateral",due:"Feb 19",tid:"c301e733-99d3-4bd6-848a-bbc06e9bddcf"}),T("Card Carrier","C","NOT_STARTED",{m:"Program Collateral",due:"Feb 19",tid:"a659ab79-a3cd-4cc0-bd74-8c5993cb3d53"}),T("Marketing Materials","C","NOT_STARTED",{m:"Program Collateral",due:"Feb 24",tid:"dbe62700-a6b2-4580-92dc-af92f9a19764"}),T("Open Bank Accts","I","NOT_STARTED",{m:"Transpecos Bank",a:"Joe B.",due:"Feb 19",tid:"a4913eb3-9381-49ba-856f-45dabdb930b7"}),T("PayOps Bank accts","I","NOT_STARTED",{m:"Transpecos Bank",due:"Feb 19",tid:"85b4cafb-08dc-46e0-99bb-fdb319e32a16"}),T("Funding instructions","I","NOT_STARTED",{m:"Transpecos Bank",a:"Joe B.",due:"Feb 19",tid:"5b995a4e-ef13-417b-8bdd-89de4461ebce"})]},
{id:"transpecos",name:"Transpecos Program",status:"LATE",pm:"Katie Hamm",pid:"378d9053-f82c-49ee-b11f-abe4ef9af528",done:[],stuck:[],
  wip:[T("CRISP keys ticket","I","WORKING_ON_IT",{m:"Network Onboarding",a:"Will H.",due:"Feb 19 !!",tid:"68f0704d-a1e0-4949-ab8a-613a6ba366da"}),T("Weekly bank meetings","I","WORKING_ON_IT",{m:"Pre-Implementation",due:"overdue",tid:"488e758a-2dd6-4d1e-ae7b-8527da23064c"})],
  up:[T("Admin for Bank accts","I","NOT_STARTED",{m:"Payment Operations",due:"Feb 19",tid:"16d876c3-7365-486d-84c5-71e59f1e6ee9"}),T("Final funds flow","I","NOT_STARTED",{m:"Payment Operations",due:"Feb 20",tid:"7f38738a-d80e-4952-9a7b-1ccd2d5cf95c"}),T("Bank Dashboard PayOps","I","NOT_STARTED",{m:"Payment Operations",due:"Feb 19",tid:"c651ec0b-189b-40fa-9644-045b54aa6e7a"}),T("Fund Reserves","I","NOT_STARTED",{m:"Payment Operations",due:"Feb 19",tid:"8698e621-3cb8-40a5-8d74-28327aa3f524"}),T("Visa Card Vendor","I","NOT_STARTED",{m:"Network Onboarding",due:"Feb 19",tid:"7268ffbd-4ec9-4ecf-b0dd-15667ab356a2"}),T("Card vendor cert","I","NOT_STARTED",{m:"Network Onboarding",due:"Feb 26",tid:"0b44d0f4-5b24-42e3-914b-a56e536a9788"}),T("Exchange keys mfg","I","NOT_STARTED",{m:"Engineering",due:"Feb 26",tid:"879347ae-c4e9-4453-8fa0-f6f401c52de2"}),T("Bank report walkthrough","I","NOT_STARTED",{m:"Engineering",due:"Feb 20",tid:"1a46c4c0-21eb-424f-9c42-a0bec0d8e65c"})]},
{id:"lowes",name:"Lowes HELOC",status:"LATE",pm:"Mary Boomsma",pid:"c8401a72-655b-4093-b9fc-dc42947ea528",done:[],
  stuck:[T("Reserve Statement","I","STUCK",{m:"Testing",due:"Feb 13 !!",tid:"aa84b953-93e0-4a94-beb8-33aefd847419"}),T("Funds Reserves","I","STUCK",{m:"Testing",a:"Jody S.",due:"Feb 13 !!",tid:"aa484976-c5b8-4dfc-96dd-3bacf097f6ff"})],
  wip:[T("Pay Impl Fee","I","WORKING_ON_IT",{m:"Post Sales",a:"Mary B.",due:"Jan 30 !!",tid:"16e94846-fe1d-4c6d-ada5-9ad317eb5694"}),T("Enable ACH","I","WORKING_ON_IT",{m:"Celtic",a:"Gabe J.",due:"Feb 13 !!",tid:"d03da524-bfbb-4034-a907-0e2688a7ce71"})],up:[]},
{id:"collectors",name:"Collectors Card",status:"ON_TIME",pm:"Mary Boomsma",pid:"04b6574e-9173-4f61-b706-988798ace2dd",
  done:[T("Assign BIN","I","DONE",{m:"CRB",date:"Feb 18",tid:"ba94fa8a-9d63-4cd5-8d45-d7285da21f16"}),T("Experian Kickoff","I","DONE",{m:"Consumer Credit",date:"Feb 19",tid:"6928ae7b-5a29-458d-9dee-a016d834bed6"}),T("Plaid Doc","C","DONE",{m:"System Configuration",date:"Feb 19",tid:"72bbde04-d7f1-437b-8289-b6aa888ba758"}),T("Plaid End User","I","DONE",{m:"System Configuration",date:"Feb 19",tid:"98a2ec78-417a-4e96-b92e-a9ead7509faa"}),T("Plaid Kickoff","I","DONE",{m:"System Configuration",date:"Jan 14",tid:"1cc106fc-4ba8-4acf-a0c5-b55d779f6d90"})],
  stuck:[T("BIN Tokenization","I","STUCK",{m:"CRB",a:"Karen L.",tid:"4fdc7dbe-3053-47ed-a5c4-4f029f53faef"}),T("Pay Impl Fee","C","STUCK",{m:"Post Sales",a:"Andi H.",due:"Jan 19 !!",tid:"6438851b-7120-4ef5-89b0-cf3189ef5203"}),T("Plaid Keys","I","STUCK",{m:"System Configuration",a:"Katie H.",tid:"90f769d6-dbe6-473b-8831-4a380bef657c"})],
  wip:[T("Scope sign off","C","WORKING_ON_IT",{m:"Post Sales",a:"Andi H.",due:"Feb 6 !!",tid:"28e25806-c355-464c-b9d9-d7156ac74dae"}),T("CHA","C","WORKING_ON_IT",{m:"Program Collateral",a:"Isaiah B.",tid:"ad32ba64-5262-4a5e-b0d2-f617593e68ec"}),T("CRB Board","T","WORKING_ON_IT",{m:"CRB",tid:"0fbef5d6-c4f9-4e32-87e8-c42e8fd0fad7"}),T("Marketing","C","WORKING_ON_IT",{m:"Program Collateral",a:"Chris C.",tid:"6397c9c5-e7dd-4f96-ac1e-6b43a4c9babc"}),T("Toll Free Number","C","WORKING_ON_IT",{m:"Program Collateral",a:"Isaiah B.",tid:"c6ea9b6a-2979-4f99-879b-a912834ea6d3"}),T("Tag Integration","I","WORKING_ON_IT",{m:"CRB",a:"Katie H.",tid:"bfba5549-1a4d-4b52-8123-4ba1ac6ac19d"}),T("Doc Collection","C","WORKING_ON_IT",{m:"Consumer Credit",tid:"0f9fc56d-076c-4539-b0a7-5adc62c31351"}),T("Plaid Integration","C","WORKING_ON_IT",{m:"System Configuration",tid:"01e6c7a0-d139-44b2-b2b8-d57d6dd7eaec"}),T("Auth Request","I","WORKING_ON_IT",{m:"System Configuration",a:"Katie H.",tid:"aa4dff41-fd73-4d12-8e15-e6034fb73aad"})],
  up:[T("Reserve Statement","I","NOT_STARTED",{m:"Testing",a:"Mary B.",due:"Feb 26",tid:"e73e7501-3e6e-4800-86cf-9cafabb56dbb"}),T("Setup Arroweye","I","NOT_STARTED",{m:"CRB",a:"Mary B.",due:"Feb 20",tid:"249bd088-a5b2-4161-a368-375bff0c69f8"}),T("Open Bank Accts","T","NOT_STARTED",{m:"CRB",due:"Feb 20",tid:"45a6c513-4110-41e2-b492-990fd58e8107"}),T("Profile Cert","I","NOT_STARTED",{m:"Tag Physical Cards",a:"Katie H.",due:"Feb 26",tid:"c77c5209-6535-4c30-8ce5-abc5a65755b5"}),T("Card Files Approved","I","NOT_STARTED",{m:"Tag Physical Cards",a:"Mary B.",due:"Feb 25",tid:"56cab0ef-9699-4456-a328-565edb078161"}),T("Tag Carrier Pre-Reqs","C","NOT_STARTED",{m:"Tag Physical Cards",due:"Feb 26",tid:"39ae60d6-7c9e-4ad4-a5c2-a32435f06caf"}),T("Carrier Mfg Quote","C","NOT_STARTED",{m:"Tag Physical Cards",due:"Feb 26",tid:"91da1820-f2f8-4246-9db5-ea5521887626"})]},
{id:"edstruments",name:"Edstruments",status:"ON_TIME",pm:"Mary Boomsma",pid:"",done:[],stuck:[T("Wallet Tokenization","I","STUCK",{a:"Karen L."})],wip:[],up:[]},
{id:"pingpong",name:"PingPong AP Invoice",status:"ON_TIME",pm:"Mary Boomsma",pid:"60a6c258-954c-45ee-8878-bba6542eefe1",done:[],stuck:[],
  wip:[T("Assign BIN","I","WORKING_ON_IT",{m:"CRB",a:"Karen L.",due:"Feb 13 !!",tid:"1995ef71-3d7a-4e67-acd4-2ed0be23c0e0"}),T("Review Policies","I","WORKING_ON_IT",{m:"Policies and Procedures",a:"Courtney R.",tid:"f74e1b67-dd26-438a-ad23-08b27134b38b"}),T("Verification WF ID","I","WORKING_ON_IT",{m:"System Configuration",a:"Mary B.",due:"Feb 13 !!",tid:"57ef0b6e-9644-4f70-80e3-fdad21727e3e"}),T("Overview Deck","I","WORKING_ON_IT",{m:"CRB",a:"Mary B.",due:"Feb 20",tid:"065b835c-a100-4512-879d-a26de4725713"}),T("CRB Projections","I","WORKING_ON_IT",{m:"CRB",a:"Mary B.",due:"Feb 17 !!",tid:"a5bc2c83-3454-4338-8c54-3b620fe6fdd6"})],
  up:[T("Virtual Card Design","C","NOT_STARTED",{m:"Program Collateral",due:"Feb 20",tid:"5e605716-52b6-40bc-a5f3-de24af1d63de"}),T("Document funds flow","I","NOT_STARTED",{m:"CRB",a:"Mary B.",due:"Feb 20",tid:"0208ef9a-cd74-4506-8267-0ea0bbd606c0"}),T("Configure Product","I","NOT_STARTED",{m:"System Configuration",a:"Mary B.",due:"Feb 24",tid:"b21932cf-ae15-4bd8-a7c1-5f23d656a884"}),T("Create Program","I","NOT_STARTED",{m:"System Configuration",a:"Mary B.",due:"Feb 20",tid:"716b5447-86e5-41c4-95db-a823e1b6b860"}),T("Risk Rules","I","NOT_STARTED",{m:"System Configuration",a:"Mary B.",due:"Feb 23",tid:"6f2ba109-2d1b-4c9f-ae48-fb8cf64bfa4a"}),T("Spend/Velocity","I","NOT_STARTED",{m:"System Configuration",a:"Mary B.",due:"Feb 23",tid:"9294dcaf-5f30-4610-81b2-72919b045ea5"})]},
{id:"remodel",name:"Remodel Health",status:"ON_TIME",pm:"Joe Benscoter",pid:"ecfd472d-f7ef-4863-86be-71d1d5e9bdff",
  done:[T("Solution review","I","DONE",{m:"Post Sales",date:"Feb 17",tid:"66668a84-e925-4eff-a096-54817acde913"}),T("Pay Impl Fee","C","DONE",{m:"Post Sales",date:"Feb 17",tid:"df4de2d8-15e2-49ff-af9a-60b4bdff1170"})],stuck:[],
  wip:[T("Assign BIN Range","I","WORKING_ON_IT",{m:"CRB",a:"Aditya A.",tid:"1470cfd1-36af-44d2-840f-f7f72b88e885"}),T("Due Diligence","I","WORKING_ON_IT",{m:"Due Diligence",a:"Courtney R.",due:"Feb 20",tid:"ac27c7bb-3a7f-41ea-839d-5af8274a6b77"})],
  up:[T("Document funds flow","I","NOT_STARTED",{m:"CRB",a:"Joe B.",due:"Feb 23",tid:"26fe86c0-f79e-42b4-9233-e7ab3e316c9b"}),T("Enable 3DS","I","NOT_STARTED",{m:"CRB",a:"Joe B.",due:"Feb 23",tid:"36948c4b-4d4b-4b42-ae73-0e04bad6154d"}),T("Bank Account Doc","I","NOT_STARTED",{m:"CRB",a:"Joe B.",due:"Feb 20",tid:"8decff61-45ce-4cda-ab85-6ef20d2b8f1b"}),T("API Keys","I","NOT_STARTED",{m:"CRB",a:"Joe B.",due:"Feb 20",tid:"b876de8c-1bbd-424b-b086-58d9d76c49e5"}),T("CRB Projections","I","NOT_STARTED",{m:"CRB",a:"Joe B.",due:"Feb 24",tid:"861deee2-26d1-4a79-8d0b-9926ebd6d0a8"}),T("Overview Deck","I","NOT_STARTED",{m:"CRB",a:"Joe B.",due:"Feb 20",tid:"e995e255-421f-452f-8b3e-6824cf4dcc07"}),T("Prefix CRB","I","NOT_STARTED",{m:"CRB",a:"Joe B.",due:"Feb 20",tid:"1fe21966-1056-4c29-9ad8-394c91a58090"}),
    T("Card Product/Profile","I","NOT_STARTED",{m:"System Configuration",a:"Joe B.",due:"Feb 25",tid:"ff988635-8e13-4b8c-96e1-503b67020629"}),T("Create Program","I","NOT_STARTED",{m:"System Configuration",a:"Joe B.",due:"Feb 23",tid:"354304e8-8fc2-4ea2-b000-3948b2c451c5"}),T("Config Product","I","NOT_STARTED",{m:"System Configuration",a:"Joe B.",due:"Feb 25",tid:"0869810c-9502-469c-9dfb-ef8ec18faf31"}),T("Test Product","I","NOT_STARTED",{m:"System Configuration",a:"Joe B.",due:"Feb 24",tid:"621f8154-375a-4d75-8490-e4dd0ae5d6c4"}),T("Tenant/Org","I","NOT_STARTED",{m:"System Configuration",a:"Joe B.",due:"Feb 23",tid:"cffd3b8b-a098-4567-819b-170e02095233"}),T("Verification WF ID","I","NOT_STARTED",{m:"System Configuration",a:"Joe B.",due:"Feb 19",tid:"f327106e-6c55-432a-b074-d6f8633d035e"}),T("Spend/Velocity","I","NOT_STARTED",{m:"System Configuration",a:"Joe B.",due:"Feb 24",tid:"5018ff05-cdce-4010-9c32-6295de4943a6"}),T("Risk Rules","I","NOT_STARTED",{m:"System Configuration",a:"Joe B.",due:"Feb 24",tid:"2a0a44f6-e82f-45c1-b87b-e9f2afc3288d"}),
    T("Onboarding","I","NOT_STARTED",{m:"Technical Implementation",a:"Kevin R.",due:"Feb 19",tid:"dfdfa90d-1684-4e0f-8e89-473dbffdd40b"}),T("Statements/Txn","I","NOT_STARTED",{m:"Technical Implementation",a:"Kevin R.",due:"Feb 19",tid:"d18d03c0-c012-4f75-a301-d43879ae75d4"}),T("Funding","I","NOT_STARTED",{m:"Technical Implementation",a:"Kevin R.",due:"Feb 19",tid:"6a01e9be-6cab-48a6-b154-9da7a9d17270"}),T("Card Issuance","I","NOT_STARTED",{m:"Technical Implementation",a:"Kevin R.",due:"Feb 19",tid:"62006462-2312-4851-92bb-928811ca42c1"}),T("Disputes","I","NOT_STARTED",{m:"Technical Implementation",a:"Kevin R.",due:"Feb 19",tid:"b2bafb5e-980a-4be6-b416-ecf99b2c72a9"}),
    T("Policies Themis","I","NOT_STARTED",{m:"Launch Readiness",a:"Joe B.",due:"Feb 23",tid:"ad9937c0-54c6-4f96-a3f6-d2c0729343c0"}),T("Sub Hub","I","NOT_STARTED",{m:"Launch Readiness",a:"Joe B.",due:"Feb 23",tid:"37ef7434-b7b8-4adc-9e7f-dba58ac49f24"}),T("Testing winddown","I","NOT_STARTED",{m:"Launch Readiness",a:"Joe B.",due:"Feb 26",tid:"c334df52-fa4a-418b-9e6a-3c18b3d6a71b"}),
    T("Test Funds","I","NOT_STARTED",{m:"Testing",a:"Joe B.",due:"Feb 26",tid:"b15f79e5-5950-4eec-9f0c-700eae2d7ce1"}),T("Live Env access","I","NOT_STARTED",{m:"Testing",a:"Joe B.",due:"Feb 25",tid:"c3fc5b81-0a99-4259-8223-5335690f7cbd"}),T("System Config Complete","I","NOT_STARTED",{m:"Testing",a:"Jody S.",due:"Feb 25",tid:"336194bf-b086-4010-a85a-812e669d1249"}),
    T("Scope sign off","C","NOT_STARTED",{m:"Post Sales",a:"Bill W.",due:"Feb 19",tid:"580b2990-538d-49e3-8deb-51d6f577d7f8"}),T("Virtual Card Design","C","NOT_STARTED",{m:"Program Collateral",due:"Feb 24",tid:"6afb5aa8-fd2f-41bb-8f8c-a61bd6ea2228"}),
    T("Social Media","C","NOT_STARTED",{m:"Policies and Procedures",a:"Niki M.",due:"Feb 20",tid:"645eb232-ee92-4fa6-a9a6-bd8c61f32f25"}),T("Info Security","C","NOT_STARTED",{m:"Policies and Procedures",a:"Niki M.",due:"Feb 20",tid:"550d6434-6a73-4c43-b9f8-a130b4fa3c03"}),T("Cust Service","C","NOT_STARTED",{m:"Policies and Procedures",a:"Niki M.",due:"Feb 20",tid:"eafb13f3-ab2a-46ba-adb1-6b976ff088c3"}),T("RFPA","C","NOT_STARTED",{m:"Policies and Procedures",a:"Niki M.",due:"Feb 20",tid:"be198424-765b-44df-b4d1-2d78895e5865"}),T("Issue Mgmt","C","NOT_STARTED",{m:"Policies and Procedures",a:"Bill W.",due:"Feb 20",tid:"e663562d-00ba-46cc-a64a-652d3b88a5f0"}),T("Compliance Training","C","NOT_STARTED",{m:"Policies and Procedures",a:"Niki M.",due:"Feb 20",tid:"bdc7668f-9439-412c-8ab0-2e9ad454a3da"}),T("Doc Retention","C","NOT_STARTED",{m:"Policies and Procedures",a:"Niki M.",due:"Feb 20",tid:"4b370de5-9fa3-4b8e-abaa-bfbfd7ed28b6"}),T("Vendor Mgmt","C","NOT_STARTED",{m:"Policies and Procedures",a:"Niki M.",due:"Feb 20",tid:"201b35bd-8d2b-4498-84f0-6fc70cdc1ef0"}),T("Ad/Marketing","C","NOT_STARTED",{m:"Policies and Procedures",a:"Niki M.",due:"Feb 20",tid:"a2e7f661-fbb7-4a66-89aa-e0927a5de435"}),T("Complaints","C","NOT_STARTED",{m:"Policies and Procedures",a:"Niki M.",due:"Feb 20",tid:"4ef702b9-65fb-4c25-bb35-722cb9326fe0"}),T("E-Sign","C","NOT_STARTED",{m:"Policies and Procedures",a:"Niki M.",due:"Feb 20",tid:"5adec70d-3257-4eb2-a829-7b80d6074d99"}),T("UDAAP/UDAP","C","NOT_STARTED",{m:"Policies and Procedures",a:"Niki M.",due:"Feb 20",tid:"4fcbe6e9-04ef-46ca-bdc3-cc330116731f"}),T("BSA/AML/OFAC","C","NOT_STARTED",{m:"Policies and Procedures",a:"Niki M.",due:"Feb 20",tid:"2dbf80c1-9ca8-4d0d-ac89-28912dde1237"}),T("Privacy Policy","C","NOT_STARTED",{m:"Policies and Procedures",a:"Niki M.",due:"Feb 20",tid:"49f30b24-3f81-482c-b1ce-afc329ef0e70"}),T("BCP/DR","C","NOT_STARTED",{m:"Policies and Procedures",a:"Niki M.",due:"Feb 20",tid:"8cca5a23-1ec5-42cb-bd58-dbdeac766787"}),T("Red Flags","C","NOT_STARTED",{m:"Policies and Procedures",a:"Niki M.",due:"Feb 20",tid:"098483e1-b84d-4264-b17e-69703c5c95c6"})]},
{id:"magellan",name:"Magellan",status:"LATE",pm:"Kate Murphey",pid:"",done:[],stuck:[],wip:[T("1 in progress","I","WORKING_ON_IT")],up:[]},
{id:"fluz-pcr",name:"Fluz Physical Cards",status:"ON_TIME",pm:"Katie Hamm",pid:"",done:[],stuck:[],wip:[],up:[]},
{id:"fluz-token",name:"Fluz Tokenization",status:"ON_TIME",pm:"Mary Boomsma",pid:"",done:[],stuck:[],wip:[T("2 in progress","I","WORKING_ON_IT")],up:[]},
{id:"workwhile",name:"WorkWhile",status:"ON_TIME",pm:"Mary Boomsma",pid:"69d2416f-7537-4062-80d8-b937f204c4bc",
  done:[T("Themis Setup","I","DONE",{m:"Due Diligence",date:"Feb 17",tid:"368434ad-a37f-4285-bdbb-0ea1a1585f80"}),T("Solution Review","I","DONE",{m:"Post Sales",date:"Feb 18",tid:"c36082a6-2619-46c3-81cb-d6587f665a6b"}),T("Impl Invoice","I","DONE",{m:"Post Sales",date:"Feb 19",tid:"4732dd15-24ed-4f45-8780-7d5b51c7cc53"}),T("Host Kickoff","I","DONE",{m:"Post Sales",date:"Feb 19",tid:"1a0fcf41-2590-4828-8ced-89b6c486bba6"}),T("Schedule Kickoff","I","DONE",{m:"Kickoff",date:"Feb 19",tid:"81ea54f6-601f-4a6e-b49c-bb37eee2b631"})],
  stuck:[],wip:[T("Pay Impl Fee","C","WORKING_ON_IT",{m:"Post Sales",tid:"7135f879-797d-4ca2-85a0-72f39d9da9c5"})],
  up:[T("Review sign off","I","NOT_STARTED",{m:"Post Sales",a:"Mary B.",due:"Feb 20",tid:"492e4581-a1d8-4ab8-8162-ad3f278f4005"}),T("W-9/ACH","C","NOT_STARTED",{m:"Post Sales",due:"Feb 23",tid:"49e98c80-b397-48db-a768-f467d5bc0102"}),T("Onboarding Q","C","NOT_STARTED",{m:"Due Diligence",due:"Feb 26",tid:"37a06bd2-0a69-467f-8ff5-008f921d9a6b"}),T("Themis Guide","C","NOT_STARTED",{m:"Due Diligence",due:"Feb 19",tid:"4465fb8b-b7a0-421c-993c-0983e594261e"}),T("Fee Paid","I","NOT_STARTED",{m:"Kickoff",a:"PayOps",due:"Feb 24",tid:"abab8123-fbea-424d-94b5-ba2c303e1169"}),T("Themis Intake","I","NOT_STARTED",{m:"Kickoff",due:"Feb 19",tid:"bfda5f64-aeef-40bf-a3dd-b9f9481b5f2b"}),T("Document Scope","I","NOT_STARTED",{m:"Onboarding",due:"Feb 19",tid:"e1abc4cb-27c0-45de-9632-aaa09367ce78"}),T("Custom Fields","I","NOT_STARTED",{m:"Onboarding",due:"Feb 23",tid:"602cad8a-40ed-437e-9a79-49466276180c"})]},
{id:"coverd",name:"Coverd",status:"ON_TIME",pm:"Joe Benscoter",pid:"9e2b0067-dfc2-430a-8318-a6b0f7567bb2",
  done:[T("W-9/ACH","C","DONE",{m:"Post Sales",date:"Feb 17",tid:"9c373225-2a24-4e6f-b0f5-36c82088a49c"}),T("Solution Review","I","DONE",{m:"Post Sales",date:"Feb 17",tid:"236615ac-369e-4979-a864-78977f26dadc"}),T("Weekly meetings","I","DONE",{m:"Post Sales",date:"Feb 17",tid:"b981e4cf-c443-4d1b-95cf-0ae092b61f65"}),T("Host Kickoff","I","DONE",{m:"Post Sales",date:"Feb 17",tid:"4a913c58-c113-483e-a346-b1cec9832310"})],
  stuck:[],
  wip:[T("Prepare Bank Deck","I","WORKING_ON_IT",{m:"Due Diligence",a:"Joe B.",due:"Feb 11 !!",tid:"b8e91e81-67c0-4b49-a98c-de090f9b29a5"}),T("Pay Impl Fee","C","WORKING_ON_IT",{m:"Post Sales",tid:"c7ab7dbb-2087-4292-bb99-1b130b86a3f9"})],
  up:[T("Scope sign off","C","NOT_STARTED",{m:"Post Sales",due:"Feb 20",tid:"c73f3afb-15bf-4698-a56b-431626ec3a7a"}),T("Onboarding Q","C","NOT_STARTED",{m:"Due Diligence",due:"Feb 26",tid:"38300fab-ab95-4f33-ae16-a0bf6beeeb6e"}),T("Open Bank Accts","T","NOT_STARTED",{m:"CRB",due:"Feb 23",tid:"f8b3be87-2756-4581-bc9c-8836c850d15b"}),T("Risk SDK","I","NOT_STARTED",{m:"Technical Implementation",a:"Joe B.",due:"Feb 19",tid:"3558a264-d752-4ca3-ac69-7d5f3fb66106"}),T("Disputes","C","NOT_STARTED",{m:"Technical Implementation",due:"Feb 19",tid:"74e12deb-a14e-4632-a3b8-ab3c5273eb4f"}),T("Onboarding","C","NOT_STARTED",{m:"Technical Implementation",due:"Feb 19",tid:"2be0d956-852d-4f8f-9503-f768a9410dce"}),T("Card Issuance","C","NOT_STARTED",{m:"Technical Implementation",due:"Feb 19",tid:"719defad-9d9c-4a8a-be58-acc8143ced95"}),T("Statements/Txn","C","NOT_STARTED",{m:"Technical Implementation",due:"Feb 19",tid:"e7a56fe7-9523-445c-9630-587e617ad5eb"}),T("Funding","C","NOT_STARTED",{m:"Technical Implementation",due:"Feb 19",tid:"32910ccf-93e3-490b-b7a9-698845bc580c"}),T("Sub Hub","I","NOT_STARTED",{m:"Launch Readiness",a:"Joe B.",due:"Feb 23",tid:"633be779-2d69-4b93-8cbd-39cde5af6a47"}),T("Policies Themis","I","NOT_STARTED",{m:"Launch Readiness",a:"Joe B.",due:"Feb 23",tid:"5e614b15-ea68-47d0-8a1d-1ca3495eef81"}),T("Policy Module","I","NOT_STARTED",{m:"Policies and Procedures",a:"Joe B.",due:"Feb 20",tid:"cbdd4d32-c0c2-4d24-9086-2314735ec992"}),T("Verification WF ID","I","NOT_STARTED",{m:"System Configuration",a:"Joe B.",due:"Feb 20",tid:"c3450e77-ab39-4f5c-9f49-d0e4560f0d6d"}),T("Subscriber Testing","C","NOT_STARTED",{m:"Testing",due:"Feb 23",tid:"93f353f6-f92f-4fbb-b8f7-70f55c0e74f4"})]},
];

var FT=[
  {id:"f1",title:"HN / Remodel: Sync",date:"Feb 17",pm:"Joe Benscoter",actions:["Joe: build pitch deck, submit to CRB by EOW","Remodel: begin policy submissions by Feb 20","Kevin Ruan: start API integration review"]},
  {id:"f2",title:"HN / Runa: Sync",date:"Feb 17",pm:"Joe Benscoter",actions:["Joe: confirm go-live date with sponsor bank","Runa: complete final UAT sign-off"]},
  {id:"f3",title:"HN / Remodel: Sync",date:"Feb 10",pm:"Joe Benscoter",actions:["Joe: send scope doc for sign-off","Remodel: review Themis getting started guide"]},
  {id:"f4",title:"HN / Runa: Sync",date:"Feb 10",pm:"Joe Benscoter",actions:["Highnote: complete testing wind down by Feb 17","Runa: confirm reward tiers"]},
  {id:"f5",title:"HN / APMEX: Sync",date:"Feb 9",pm:"Joe Benscoter",actions:["APMEX: prioritize 12 outstanding policies","Joe: follow up on BIN request","Bank package target: Feb 11"]},
];

var SC={ON_TIME:"#16a34a",LATE:"#dc2626",ON_HOLD:"#d97706"};var SL={ON_TIME:"On Time",LATE:"Late",ON_HOLD:"On Hold"};
var RC={CUSTOMER:"#7c3aed",INTERNAL:"#0d9488",THIRD_PARTY:"#d97706",MIXED:"#64748b"};var RL={CUSTOMER:"Subscriber",INTERNAL:"Internal",THIRD_PARTY:"3rd Party",MIXED:"Mixed"};

// Highnote mark - the three dots logo rendered as clean circles
function HNMark(props){var s=props.size||24;return <svg width={s} height={s} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#55F5A3"/><circle cx="54" cy="45" r="6.3" fill="#000"/><circle cx="35" cy="56" r="6.3" fill="#000"/><circle cx="67" cy="63" r="6.3" fill="#000"/></svg>;}
function isOD(t){return t.due&&(t.due.indexOf("!!")>=0||t.due.indexOf("overdue")>=0);}
function groupByMS(tasks){var g={},o=[];tasks.forEach(function(t){var k=t.m||null;if(!g[k]){g[k]=[];o.push(k);}g[k].push(t);});return o.map(function(k){return{ms:k,tasks:g[k]};});}
function hasMS(tasks){return tasks.some(function(t){return t.m;});}
// Active milestone map (updated when live data loads)
var _activeMsMap = MS;
function taskUrl(pid,tid,mname){var mid=_activeMsMap&&_activeMsMap[pid]&&_activeMsMap[pid][mname]||"";return pid&&tid?GCX+pid+"/plan?edit-task=true&task-id="+tid+(mid?"&milestone-id="+mid:"")+"&task-tab=details":null;}
function projUrl(pid){return pid?GCX+pid+"/overview":null;}

// External link icon (inline SVG as text)
function ExtIcon(props){return <svg width={props.size||10} height={props.size||10} viewBox="0 0 12 12" fill="none" style={{display:"inline",verticalAlign:"middle",marginLeft:4,opacity:0.5}}><path d="M4.5 1.5H2.5C1.95 1.5 1.5 1.95 1.5 2.5v7c0 .55.45 1 1 1h7c.55 0 1-.45 1-1V7.5M7.5 1.5h3v3M5 7l5.5-5.5" stroke={props.color||"currentColor"} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;}

function Badge(props){return <span style={{background:props.c+"18",color:props.c,fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:20,whiteSpace:"nowrap"}}>{props.label}</span>;}
function Pill(props){return <span style={{background:props.c+"15",color:props.c,fontSize:10,fontWeight:600,padding:"2px 7px",borderRadius:4}}>{props.label}</span>;}

function Metric(props){var glowColor=props.color||"#16a34a";return <div style={{background:"#ffffff",border:"1px solid #E2E0D6",borderRadius:16,padding:"22px 24px",flex:1,minWidth:140,boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
  <div style={{color:"#78756d",fontSize:10,fontWeight:600,letterSpacing:1.5,textTransform:"uppercase",marginBottom:8}}>{props.label}</div>
  <div style={{color:props.color||"#1a1a1a",fontSize:32,fontWeight:700,lineHeight:1,fontFamily:"monospace"}}>{props.value}</div>
  {props.sub&&<div style={{color:"#9c9789",fontSize:11,marginTop:6}}>{props.sub}</div>}
</div>;}

function TLine(props){var t=props.task;var pid=props.pid;var od=isOD(t);var dc=t.s==="DONE"?"#16a34a":t.s==="STUCK"?"#dc2626":od?"#d97706":"#2563eb";
  var url=taskUrl(pid,t.tid,t.m);
  var nameEl=url?<a href={url} target="_blank" rel="noopener noreferrer" style={{flex:1,color:"#1a1a1a",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",textDecoration:"none"}} onMouseEnter={function(e){e.currentTarget.style.color="#16a34a";e.currentTarget.style.textDecoration="underline"}} onMouseLeave={function(e){e.currentTarget.style.color="#1a1a1a";e.currentTarget.style.textDecoration="none"}}>{t.n}<ExtIcon color="#16a34a"/></a>:<span style={{flex:1,color:"#1a1a1a",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.n}</span>;
  return <div style={{display:"flex",alignItems:"center",gap:8,padding:"3px 0",fontSize:13}}>
    <span style={{width:7,height:7,borderRadius:"50%",flexShrink:0,background:dc}}/>
    {nameEl}
    {t.r&&<Pill label={RL[t.r]||t.r} c={RC[t.r]||"#94a3b8"}/>}
    {t.a&&<span style={{color:"#78756d",fontSize:11,flexShrink:0}}>{t.a}</span>}
    {(t.due||t.date)&&<span style={{fontSize:11,fontFamily:"monospace",color:od?"#dc2626":"#78756d",flexShrink:0}}>{(t.due||t.date).replace(/ !!/g,"")}</span>}
  </div>;}

function TList(props){var tasks=props.tasks;var pid=props.pid;
  if(!tasks||tasks.length===0)return <div style={{color:"#78756d",fontSize:13,padding:"8px 0"}}>No tasks.</div>;
  if(!hasMS(tasks))return <div>{tasks.map(function(t,i){return <TLine key={i} task={t} pid={pid}/>;})}</div>;
  var groups=groupByMS(tasks);
  return <div>{groups.map(function(g,gi){return <div key={gi} style={{marginBottom:gi<groups.length-1?10:0}}>
    {g.ms&&<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4,marginTop:gi>0?6:0}}>
      <span style={{color:"#16a34a",fontSize:7}}>&#9670;</span>
      <span style={{color:"#9c9789",fontSize:11,fontWeight:600,textTransform:"uppercase",letterSpacing:0.8}}>{g.ms}</span>
      <span style={{flex:1,borderBottom:"1px solid #E2E0D6"}}/>
      <span style={{color:"#78756d",fontSize:10,fontFamily:"monospace"}}>{g.tasks.length}</span>
    </div>}
    {g.tasks.map(function(t,i){return <TLine key={i} task={t} pid={pid}/>;})}</div>;})}</div>;}

function PCard(props){var p=props.proj;
  var _a=useState(props.startOpen||false),open=_a[0],setOpen=_a[1];
  var _b=useState(props.initTab||"all"),sub=_b[0],setSub=_b[1];
  var stk=p.stuck.length,odW=p.wip.filter(isOD).length,total=p.done.length+p.stuck.length+p.wip.length+p.up.length,has=total>0;
  var subs=[{id:"all",l:"All",ct:total},{id:"stuck",l:"Stuck",ct:stk,c:"#dc2626"},{id:"wip",l:"In Progress",ct:p.wip.length,c:"#3b82f6"},{id:"done",l:"Done (7d)",ct:p.done.length,c:"#16a34a"},{id:"up",l:"Upcoming",ct:p.up.length,c:"#8b5cf6"}].filter(function(s){return s.ct>0;});
  var vis=sub==="stuck"?p.stuck:sub==="wip"?p.wip:sub==="done"?p.done:sub==="up"?p.up:[].concat(p.stuck,p.wip,p.up,p.done);
  var pUrl=projUrl(p.pid);
  return <div style={{background:"#ffffff",border:"1px solid #E2E0D6",borderRadius:16,marginBottom:10,overflow:"hidden",borderLeft:"4px solid "+SC[p.status],boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
    <div style={{padding:"14px 18px",display:"flex",alignItems:"center",gap:12,userSelect:"none"}}>
      {has&&<span onClick={function(){setOpen(!open)}} style={{color:"#78756d",fontSize:10,transition:"transform 0.15s",transform:open?"rotate(90deg)":"rotate(0)",cursor:"pointer",padding:"4px"}}>&#9654;</span>}
      <div style={{flex:1,minWidth:0,cursor:has?"pointer":"default"}} onClick={function(){if(has)setOpen(!open)}}>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          {pUrl?<a href={pUrl} target="_blank" rel="noopener noreferrer" style={{color:"#1a1a1a",fontSize:14,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",textDecoration:"none"}} onClick={function(e){e.stopPropagation()}} onMouseEnter={function(e){e.currentTarget.style.color="#16a34a";e.currentTarget.style.textDecoration="underline"}} onMouseLeave={function(e){e.currentTarget.style.color="#1a1a1a";e.currentTarget.style.textDecoration="none"}}>{p.name}<ExtIcon color="#16a34a" size={11}/></a>:<span style={{color:"#1a1a1a",fontSize:14,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</span>}
        </div>
        <div style={{color:"#78756d",fontSize:11,marginTop:2}}>PM: {p.pm}</div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0,flexWrap:"wrap",justifyContent:"flex-end"}}>
        {stk>0&&<Badge label={stk+" stuck"} c="#dc2626"/>}{odW>0&&<Badge label={odW+" overdue"} c="#f59e0b"/>}{p.done.length>0&&<Badge label={p.done.length+" done"} c="#16a34a"/>}{p.up.length>0&&<Badge label={p.up.length+" upcoming"} c="#8b5cf6"/>}
        <Badge label={SL[p.status]||p.status} c={SC[p.status]||"#6b7280"}/></div></div>
    {open&&<div style={{borderTop:"1px solid #E2E0D6"}}>
      <div style={{display:"flex",gap:0,padding:"0 18px",borderBottom:"1px solid #E2E0D6",overflowX:"auto"}}>
        {subs.map(function(st){var a=sub===st.id;var tc=st.c||"#16a34a";return <button key={st.id} onClick={function(e){e.stopPropagation();setSub(st.id)}} style={{padding:"8px 14px",border:"none",background:a?"rgba(22,163,74,0.06)":"transparent",borderBottom:a?"2px solid "+tc:"2px solid transparent",color:a?tc:"#9c9789",fontSize:12,fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:5,whiteSpace:"nowrap"}}>{st.l}<span style={{fontSize:10,fontFamily:"monospace",opacity:0.8}}>{st.ct}</span></button>;})}</div>
      <div style={{padding:"8px 18px 14px 38px",maxHeight:500,overflowY:"auto"}}><TList tasks={vis} pid={p.pid}/></div></div>}</div>;}

function FCard(props){var m=props.meeting;
  var _a=useState(false),open=_a[0],setOpen=_a[1];
  return <div style={{background:"#ffffff",border:"1px solid #E2E0D6",borderRadius:16,marginBottom:10,overflow:"hidden",borderLeft:"4px solid #7c3aed",boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
    <div onClick={function(){setOpen(!open)}} style={{padding:"12px 18px",cursor:"pointer",display:"flex",alignItems:"center",gap:10,userSelect:"none"}}>
      <span style={{color:"#78756d",fontSize:10,transition:"transform 0.15s",transform:open?"rotate(90deg)":"rotate(0)"}}>&#9654;</span>
      <div style={{flex:1}}><div style={{color:"#1a1a1a",fontSize:13,fontWeight:600}}>{m.title}</div><div style={{color:"#78756d",fontSize:11,marginTop:2}}>{m.date} &middot; {m.pm}</div></div>
      <Pill label={m.actions.length+" actions"} c="#8b5cf6"/></div>
    {open&&<div style={{borderTop:"1px solid #E2E0D6",padding:"12px 18px 14px 36px"}}>
      <div style={{color:"#9c9789",fontSize:11,fontWeight:600,textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>Action Items</div>
      {m.actions.map(function(a,i){return <div key={i} style={{display:"flex",gap:8,padding:"4px 0",fontSize:13,color:"#1a1a1a"}}><span style={{color:"#16a34a",flexShrink:0}}>&#8226;</span><span>{a}</span></div>;})}</div>}</div>;}

function PMRow(props){var d=props.data;
  var cols=[{v:d.projects,l:"projects",c:"#1a1a1a"},{v:d.atRisk,l:"at risk",c:d.atRisk>0?"#dc2626":"#16a34a"},{v:d.stuckTasks,l:"stuck",c:d.stuckTasks>0?"#dc2626":"#9c9789"},{v:d.done7d,l:"done 7d",c:"#16a34a"},{v:d.upcoming,l:"upcoming",c:d.upcoming>0?"#7c3aed":"#9c9789"}];
  return <div style={{display:"flex",alignItems:"center",gap:16,padding:"14px 18px",background:"#ffffff",border:"1px solid #E2E0D6",borderRadius:16,marginBottom:10,borderLeft:"4px solid #55F5A3",boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
    <div style={{flex:1}}><div style={{color:"#1a1a1a",fontSize:14,fontWeight:600}}>{props.name}</div></div>
    {cols.map(function(col,i){return <div key={i} style={{textAlign:"center",minWidth:55}}><div style={{color:col.c,fontSize:18,fontWeight:700,fontFamily:"monospace"}}>{col.v}</div><div style={{color:"#78756d",fontSize:10}}>{col.l}</div></div>;})}</div>;}

export default function Dashboard(){
  var _t=useState("team"),tab=_t[0],setTab=_t[1];
  var _p=useState("all"),pmFilter=_p[0],setPmFilter=_p[1];
  var _d=useState(P),projects=_d[0],setProjects=_d[1];
  var _ms=useState(MS),msMap=_ms[0],setMsMap=_ms[1];
  var _l=useState(true),loading=_l[0],setLoading=_l[1];
  var _fa=useState(null),fetchedAt=_fa[0],setFetchedAt=_fa[1];

  function loadData(bustCache){
    setLoading(true);
    var url=bustCache?"/api/gcx?t="+Date.now():"/api/gcx";
    fetch(url).then(function(r){return r.json();}).then(function(data){
      if(data.projects){setProjects(data.projects);if(data.milestones){_activeMsMap=data.milestones;setMsMap(data.milestones);}setFetchedAt(data.fetchedAt);}
      setLoading(false);
    }).catch(function(){setLoading(false);});
  }

  useEffect(function(){loadData();},[]);

  var pms=useMemo(function(){var s={};projects.forEach(function(p){s[p.pm]=1;});return Object.keys(s).sort();},[projects]);
  var byPM=useMemo(function(){var m={};projects.forEach(function(p){if(!m[p.pm])m[p.pm]={projects:0,atRisk:0,stuckTasks:0,done7d:0,upcoming:0};m[p.pm].projects++;if(p.status==="LATE"||p.status==="ON_HOLD"||p.stuck.length>0||p.wip.some(isOD))m[p.pm].atRisk++;m[p.pm].stuckTasks+=p.stuck.length;m[p.pm].done7d+=p.done.length;m[p.pm].upcoming+=p.up.length;});return m;},[projects]);
  var fp=pmFilter==="all"?projects:projects.filter(function(p){return p.pm===pmFilter;});
  var risk=fp.filter(function(p){return p.status==="LATE"||p.status==="ON_HOLD"||p.stuck.length>0||p.wip.some(isOD);});
  var withDone=fp.filter(function(p){return p.done.length>0;});
  var withUp=fp.filter(function(p){return p.up.length>0;});
  var tD=fp.reduce(function(s,p){return s+p.done.length;},0);
  var tS=fp.reduce(function(s,p){return s+p.stuck.length;},0);
  var tU=fp.reduce(function(s,p){return s+p.up.length;},0);
  var meetings=pmFilter==="all"?FT:FT.filter(function(m){return m.pm===pmFilter;});
  var tabs=[{id:"team",label:"Team Overview"},{id:"risk",label:"At Risk",count:risk.length},{id:"done",label:"Last 7 Days",count:tD},{id:"up",label:"Next Week",count:tU},{id:"fathom",label:"Meetings",count:meetings.length},{id:"all",label:"All Projects",count:fp.length}];

  return <div style={{minHeight:"100vh",background:"#F5F3EB",fontFamily:"'Helvetica Neue', Helvetica, system-ui, sans-serif",color:"#1a1a1a"}}>
    <div style={{height:3,background:"linear-gradient(90deg,#55F5A3,#00FFF0 50%,#55F5A3)"}}/>
    <div style={{borderBottom:"1px solid #E2E0D6",padding:"20px 32px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"#ffffff"}}>
      <div style={{display:"flex",alignItems:"center",gap:16}}><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAABCGlDQ1BJQ0MgUHJvZmlsZQAAeJxjYGA8wQAELAYMDLl5JUVB7k4KEZFRCuwPGBiBEAwSk4sLGHADoKpv1yBqL+viUYcLcKakFicD6Q9ArFIEtBxopAiQLZIOYWuA2EkQtg2IXV5SUAJkB4DYRSFBzkB2CpCtkY7ETkJiJxcUgdT3ANk2uTmlyQh3M/Ck5oUGA2kOIJZhKGYIYnBncAL5H6IkfxEDg8VXBgbmCQixpJkMDNtbGRgkbiHEVBYwMPC3MDBsO48QQ4RJQWJRIliIBYiZ0tIYGD4tZ2DgjWRgEL7AwMAVDQsIHG5TALvNnSEfCNMZchhSgSKeDHkMyQx6QJYRgwGDIYMZAKbWPz9HbOBQAAASY0lEQVR42u1baXRcxZX+btV7r1e1VstCXomNjWXHYWJDDCSRxBYMTljbZGDODAmLAxh8kjPMDGFpdQJJOFkmJjEMTsIZMgkh3RiDCRkzJEjNEmDGZjOWbbANdrwh2ZKQ1Mt7r6ru/GgJnIyNpZYMmRPdPzqnW+9V9Ve37v3uBozJmIzJmIzJmIzJmPx1Cn3U6ycSCWqfPZsQ/7Nv0kBDfCMn0cIg4r+aA0lwQjRyqxXnlBzqQ8xM7z3DH+6hfjiLMVNjW4vMnPYNBX5fGSZiYmhW6h/qYtVlx3jlVlXN5DrAkujd1w2/ozvrdfS/07l+6+71d6bfPfh1cU7JBmzkJCXN/2+AmCmOtEjTYj340flrbz/Jmlx5uigPnQJh5rIj6+xQwKGABMSAUjHAvg/V7wKKO9lXW6jgv6D7Ck/uTbQ9/4c1a/oAIMEsgBYcTaCOGkBxTslBYL7w0xvr5acmXe7UlV1EQfuTdjQCAwPNCuwpGG2YAANmMBU3xSAiQULYEkLakBDQyoPuzu1S3bk17vbOn/1mYfKl99bCYgMC/+UDxEwJgJJE5pTEl+vrL/nkV61jyr8kK8LVDA2VLzAbaAKIQURgAtGh98FgMAMEw0XMhAzawhJBqJ4+1gf6H/U3d97+yKLb1gNAPJWS6cXva+tfHEAHb/Dil+9aIieWfdOpKR/n+3loTyswCSIWoNKXZcMMgiYhLDsUhunNKrW3757N33ggseGBZ7sbWxNWpjmp/uIAGtzYGXdeV1/5xRPudSZXLvKNB84pRQR5WC0pGSkAbDQsKZ1gBO7eA9tyr/7xyscXJtsaOWFlaHRAGpVNN3KrlaFmdeajt55a/anpv7bHxyYUcn0KBpIEHW1HAGYoKxqyqM/T+fa9y1Yv+McVAzbQDED50QE0CM4XMt89Nzx3/MNUEXJUf06RENaHyVfYsCFLkhMMUuH1fd986OPX3Ta4t5G8V4zUUxXB+c650b+ZuJqjjq36c7okcJg1AAWwBkMN99xJkIDScAt5FZ5Tf+ulm+79RoaaVYJbR3RQstQHE8zibppjTl9z68nl86eu5ahtmYLLJIQs4ZYYOxKStm0JadtCOAFhtI+iBxuGkhMRGSbfKGXXVTRPXTg/t3LSZc82tiasHfdnzIcHUCIh2pqa+JmJ3eNrmmc9JWvC5TpfMCWCw1bEEeqtrue8rZ1Jva/3lybnZmUsdAKTGHTzNByQoFkY1jpUW/656WfMe3Ft821vxFMp2Z5O84digwZJ4MVv3vPb0PS6hYW+Xk1y+OCAWduRsHS3dq566LhrLj74qwvWLb8uOLfux77vGVGCKWDDRoRsEj1ex7sPbjjhxOsiHWgBksnhsW5RMjgv/uDK8PTahYVcnyoNHACWEF531u95+JWbQIT46wmnsTVhpZjl6vnLVrj73m23w45g5mFfDxIkTN7XVnVsfPD0qSuSlDTtLbPp6GoQMzGAC35+U5Vz1rStNC4a45xPkMN35WyYZcghd3d391OLvj3t3Q07u8EgELgYjMb55fblj8caJp/t9fdplHB9B1RA2dKxep/btvCx5q+vPTgEGnUNiiMtiIjFJ+puCdTVVJiCb4YLDjMbMCsAPknBtrT7pjvj+hPMorEtIeetu9cG4kgSmWBl2VTNPphE6XREMbFNsI+tuhOAaMBGPjoaxEwQxKetvGF8zXmf3EoVToQ9heEwZGY2ViQoJKxiQKoM3Pa9S1Nzl95Nf5YUu/DF790cmjf5ds9zNXHp3pYYUAI6GAjIvmfeuHBN0y2rhxOODJkjNKJNZhiqYsGMv3fGxaJutl8RkTV0k0PGiQSFv6f3NVXwnmCle7nby6xa8LVnCNfjzJVLj43MnbrADlKYy8LnWBMrLvQ935CBHAmdZQKkMWAh2Z5cvRTA6qamFpNBEqMJEGXQpAFYKLcuN6xATGLIG2fWTiQovTcP/Ed6xleuAOC/z6cS4tXnys8IzapdRVWhKMGAIFDI5VgwxOgEQ0IqN892ZeSzn0vdODNJtCWRSIiheLQh2aAEJwhEvPCRr5/gVEYb/ILLEDw0+2WYRdCRqrNv38bz77oWBD/+esJp5FYrwa1WkpJG1Ie/JasiUT+b9bxcQbnZrBbDYz9HNCSsjLYqYlb0uInnA0BbS5MYNSPdhuLLgtPqzrKjEZBhPWTzRTBS2nD78pvb29v74yYl03OSXoaaVXIgTnIqghFlPCaQRYBFRBKjLAQmhgFizjkA0IQmM2pXrBadDAAi6nzWwAzJuLNhJoJhhmIQWUweGNSBcZTghGhrg6htms17r30kppWpF1oDzAxAAxBDMf7vrQEioiMcNpNQugBZFpxzXmJZRZKoZ5BWjBQgStNiPaWxMUgB2WBYFdOhR7A5MmRLKW0JCCkA6AOFn8dfSon0F09TGcMAikhfsO77/2RVl8VUoaDtaEgCBO25MJ42JEh8EFOWYUcIYUmGhsq6horAHuauEBlPGyvqVNGnx88C8HwCTEnQyABiLsJx/FcW1FHAHm88BXovc3w4bxWS3r6eTpVXGyGpy9/ZverRz/zLAwAw85SZZdNavjQxFo5E1DjrcmtS2XWGGdKQ1Lt7XmJGjkPWPKs6GlL9eT5UPomJTCAaEu6e7g5AtBtBE53xZdN91wW0OWyASwwjwwFhj49OA/B8W1uLGDyokgFqGcihR6piE6xQwFFGG6JDnywzGyccFP72rvs7VrT+Y+YHv9p/sKG84Nm7zg3OKL9H2VwPaclANAStlEFP7oC/5Z2/XXXqP/8eAM745Y3HxU4+9v7g1OqTvaxrxEGaxICxA47Ivb5vxYGfPnlLZvmjPQ1ocBrWXXWtNXPcD4wlGJoP6f2YGQQJV+sZAICmJuAI7v6IALUjTQDgVTpVoYAAFXw+lPYws7FCQeHv6dmcmnb15YNxWwfGEQD0L7kjYk0J3SdrYrUq18eaDOtcv287QSe/YfcNq5tv/n0jt1q16OQ0LX7zzMTfnW8vO2uTjMpK9vRAfp+1Ew5Ld2fX0w9/fOnSwTVSiPtE9MP4q8vnOHMnXeFn+xXwfzkaDYSA0epoZNRDjXFTaxlCfFAC01jCBmfdNWCmq3mdnabFugltJkPNatLZp44XQWucl+tnMgBpQDqO4+3v7e18YuMT8VRKZtCk07RYJ7jVejL5iw63s+dlyw4RUAxWmYgFBETB/zUz0zy+t7hGW4uMc0rmenMPsvLARzDYhZ6+Y4rOp4lHDSBYTtFZHpH2iBCIuBvbaYAjiASzcMpjIREKsCEGBBGoqPJCShGIVQrEgQRa6E88pJB28VINeCzDxhAYYSdPRBzFHgaAmWX11IA4k0U2kYQ4guFVmq1R16B3d3cRPjDBR0Ipl6kicFH9+SdWp2mxBwKSzUmVJDKq1rpGhANCGKEHE1vsKe3UxKKx0z92WZoW66RIGhBxkprV2T+7viFYG5vvuwVFtpQiaJMdDTsmm6PC6zteiXNK1qKFAWDl/CV+ksgEq2NXQooBtnB4Kaur2QUAHWijkfOgdPFPfue+QmBGVREhPlQiD0K5nnHGx+pP/eGXH3OvOucGc8/6dnPRvJgzr+p6Z3rNEi+fN0TGOkhJhOe7xplV+52LN9yd83+35SHnD8LVyyYusGdW3YuIHbKkJLezVwvNXUbKve72/d9bc87tLw++IIW4XLG87pjxp0+/UR5bdaGXy5kjEc2+/d3ekC/Okf6hIV5MD3BW7VZZz1BICphD2mkQkfD782xNqTlZxEL/g3lTdoCo0q4ti3n5PJP5M55CRPA1ISBDgdnjfiLrQnfgMuRlJDAFQQnSBv72rp92vbj1e++0vdrZ/rP/6hp89Ny1LZfFPj71+ocDVD5O+5Oc2oqIl8sx4fDcCVTkhQGS2wdjhBEDlEQLA0nsfuS1vTNOnd5jlTtVnPMPyxVJEKn+vEHIErLCmsJaw8vmNRPLQz5CBONr9lTeiMpgLRFBFzxlCUf427rWPDTjmqsOLhS0I029D7/yidgp038hysLQxoPUNtxsTh9JcxgktPJgunLbikZ69igYaSJOcEJseODxbjJqkxQ2QB9MrkiQIM0wOd+wqxkE+UGRJxERgaTJ+6zzviEiEp6i3jf33M3MFE8lHDDoN+tXyjQt1oGpNY2yLMJets/Ved+wp/iI8RszC0sI1Z0t7N+8a8vA9RydaH4wWOWs94KEYB5KtbLoj8RwEmokiGhgT9pXZPb3e8VEWrsGgTFvHpiZtNHlYCYCSRr6GkY6FjivtmSu/tEeMBMNoXNtSAANBqu5XV2/18ojEI2o4HjYwiFBM8HIUFDqftcP2cHNcU7JyvgZopFbrfXyRJ+IOFRdduZQg+aDGDgL2NCufhKAaUSbHBUjDQADNW6o/3zzaX/WMfvE+FidyXs8WnV3ZmYnEpbwFfyCAnoKXf62/Tc9dum338GlwECEj0ZMCda8tOyOwOSqU9x83ojhpEUECV3Io/DGgccAoDbdyaMGEABu5FbrSWrOxq/61ENOfXBpnlxNoBHX3xlk7GBA8FvdD/Zt2/tLdgJ7dq1d98dXvp3uBICFjycWVcydeoEOipD2vJNC9RXT3Lw7vFoZs7bCQeHv7t4YWfTac2CmNJEeTYDQhDaTAaAP9K7w+3NLhG1JKDOy9gdm7UTC0t/ScV/q+Guu+NMsJot1T95xZsWnpz9GoSAENAQ0CtmCETS8agwT2IJF2d19961BWjeizcoAo5u0T1LSDNSUNl+0+UdrQzMnfN7z+zSoxHoVM2BJobr7/M4nXv5WghOiPQ2rIQ6V3jjbShL5X9y+8hIKBdjt73VJwGKGEMO1fwwjA7b0Onv3YcM7PwEzZUBDrosN74qk0wAzZde03GIfU3EOBSyw0lxScxSDhSXJz2f73V2qI4kWRpx8ELiREwZETLYIMxsaqJ5YpVg8JjaW5VjZt/fcuebK7/Y1TgtbmWYMuSVmWKeRXpzWcaTF2vOSr3lvHfg3JxCWzCitJ5CIjK+MXRGJBU+omQUiPvvN5c7V6+6129CiwWx5UCdp1mBwaV7TsHbCYavwVuemDZfec0+CWWSak8Pa77AXTiNuEsxix6+eu7mwq2OHHQlabIZfOwcB0IZFyJbVnzlu+VlXxKvWzljmrpy/xCcijr/24ztCE6qP1QVXUwm0gpmZbMmqr8B963cs2bp1q9ueTg+mhI5CZfUgiafiMr04rT+3+tbPVJ8xs1UHBLOrJEpw+4YNO5Ewqb29b3sd3au1p3PBuopGe0Llp33XM2S4pNoYA34oXGYfeGFT8vGTb2optbmzZB802ARw3vN3Xlu2YPoK1y34pIw1/GoWAYYNRWxhU2CA9GiobI6pxMZPZvZDkZid3fLHh1Ydf318oBVPo4R+xRERvcEewPjGFS2hhvpErtCvSHFpjZvMhvEePSaUWBtjhh+IlNnezs6nXl/4rwvjGzeqZLHHuqRmzhEV6HYk7zdxZpmuPal11kWfdZwJlY3GGGZthn/6REREgohESaEMMzORCkXKbG9X1+82XfPv8Y0vvJTNMBOam0vudB1xTJUmMnFm+eDc627uf377120WQoRtwYZHrZn7iNhoNiwlB8NRO/fGnvTWSSvO2fDbZ7sTt94mkBzZHMeolHjbk0lu5IT1xOSbn55+1onrrLLIaYGKspjyXQODYmv9UeiWHuy6t6MhiZyP7ObdidVzbrh+L+9hMEQmOfIhl1Grge9IZkwjJ6y1U2/dUl9bl7Lryyc4FZE5FLLJV1oLY3ggpUejAIwBQcuQIx0nJPS+/peyf3j70scab/p5gllkQEBzZlQGW0b9XA9ucTvvme9+3vlY1a1OXfREFhKqUAAbVsRMYIgh0wJmZgaj2BsjrXCQLFhQB7I7/be772qff8OP2gFvtOc0jgpAAz/ovYkfABRf9/3zUVe+REYDp1nlZTbDQOkCjKeYmHSx4nnoHDIDgiwhLMeCgANdyEP35F/jrsJ93sr/vv/R5ff3gID4r4vcbLR/ylGdo4inUjJ9ySV6cMrwwtY7jpd1VYsQokUUDc6WIadGhh0Q5CEJCoGhfQ+63+0nz2zy+wtPY3/+0VULvvYcBijBaM1kfCQAHXztGhDnAY0qfpb4apU5vf44DtMsHbCnhqsiUb87O951/WD5xNqdffu7vYAT3MYHerfndnZveXzxt3YfvOvGpxJWpimpj8YQ3UcmgwO9zDz8gxGERm614qmUxIc4rf3RjYUzUzy9WHSMa6Bil8Vg/ruJ3694tqE2PZvTGzcykkd/gHdMxmRMxmRMxmRMxmRM3pf/BX+EL6sQrKU6AAAAAElFTkSuQmCC" alt="" style={{width:36,height:36}}/><div><div style={{fontSize:20,fontWeight:700,color:"#1a1a1a",letterSpacing:-0.3,lineHeight:1.1}}>Implementation Dashboard</div><div style={{fontSize:11,fontWeight:600,color:"#16a34a",letterSpacing:1.5,textTransform:"uppercase",marginTop:2}}>Highnote</div></div></div>
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        {fetchedAt&&<span style={{color:"#9c9789",fontSize:10}}>Updated {new Date(fetchedAt).toLocaleTimeString([],{hour:"numeric",minute:"2-digit"})}</span>}
        {loading&&<span style={{color:"#55F5A3",fontSize:11,fontWeight:600}}>Loading...</span>}
        <button onClick={function(){loadData(true);}} disabled={loading} style={{padding:"5px 10px",background:loading?"#f0ede5":"#ffffff",border:"1px solid #E2E0D6",borderRadius:8,color:loading?"#9c9789":"#1a1a1a",fontSize:11,cursor:loading?"default":"pointer",outline:"none",fontWeight:500}}>Refresh</button>
        <select value={pmFilter} onChange={function(e){setPmFilter(e.target.value)}} style={{padding:"6px 12px",background:"#ffffff",border:"1px solid #E2E0D6",borderRadius:8,color:"#1a1a1a",fontSize:12,cursor:"pointer",outline:"none"}}><option value="all">All PMs</option>{pms.map(function(pm){return <option key={pm} value={pm}>{pm}</option>})}</select></div></div>
    <div style={{padding:"24px 32px",maxWidth:1200,margin:"0 auto"}}>
      <div style={{display:"flex",gap:14,marginBottom:24,flexWrap:"wrap",position:"relative"}}><div style={{position:"absolute",width:120,height:120,background:"radial-gradient(circle,rgba(85,245,163,0.25) 0%,transparent 70%)",top:"50%",left:"25%",transform:"translate(-50%,-50%)",pointerEvents:"none",filter:"blur(30px)"}}></div><div style={{position:"absolute",width:120,height:120,background:"radial-gradient(circle,rgba(85,245,163,0.2) 0%,transparent 70%)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",pointerEvents:"none",filter:"blur(30px)"}}></div><div style={{position:"absolute",width:120,height:120,background:"radial-gradient(circle,rgba(85,245,163,0.2) 0%,transparent 70%)",top:"50%",left:"75%",transform:"translate(-50%,-50%)",pointerEvents:"none",filter:"blur(30px)"}}></div>
        <Metric label="Active Projects" value={fp.length} sub={fp.filter(function(p){return p.status==="ON_TIME"}).length+" on time"}/>
        <Metric label="At Risk" value={risk.length} color={risk.length>0?"#dc2626":"#16a34a"} sub={tS+" stuck tasks"}/>
        <Metric label="Tasks Done (7d)" value={tD} color="#16a34a" sub={"across "+withDone.length+" projects"}/>
        <Metric label="Tasks Next Week" value={tU} color="#8b5cf6" sub={"across "+withUp.length+" projects"}/></div>
      <div style={{display:"flex",gap:2,marginBottom:20,borderBottom:"1px solid #E2E0D6",overflowX:"auto"}}>
        {tabs.map(function(tb){var a=tab===tb.id;return <button key={tb.id} onClick={function(){setTab(tb.id)}} style={{padding:"10px 18px",background:a?"rgba(85,245,163,0.12)":"transparent",border:"none",borderBottom:a?"2px solid #16a34a":"2px solid transparent",color:a?"#16a34a":"#9c9789",fontSize:13,fontWeight:a?700:500,cursor:"pointer",display:"flex",alignItems:"center",gap:7,whiteSpace:"nowrap",flexShrink:0,transition:"all 0.15s ease"}}>{tb.label}{tb.count!==undefined&&<span style={{background:a?"rgba(22,163,74,0.12)":"rgba(0,0,0,0.04)",padding:"2px 8px",borderRadius:10,fontSize:11,fontFamily:"monospace",fontWeight:600}}>{tb.count}</span>}</button>;})}</div>

      {tab==="team"&&<div><p style={{color:"#9c9789",fontSize:13,margin:"0 0 16px 0"}}>Per-PM breakdown. Click project names to open in GuideCX.</p>{Object.entries(byPM).sort(function(a,b){return b[1].atRisk-a[1].atRisk}).map(function(e){return <PMRow key={e[0]} name={e[0]} data={e[1]}/>;})}</div>}
      {tab==="risk"&&<div><p style={{color:"#9c9789",fontSize:13,margin:"0 0 14px 0"}}>Projects with Late status or stuck/overdue tasks. Click any task to open in GuideCX.</p>{risk.length===0?<div style={{textAlign:"center",padding:48,color:"#16a34a",fontSize:14}}>All clear.</div>:risk.sort(function(a,b){return(b.stuck.length+b.wip.length)-(a.stuck.length+a.wip.length)}).map(function(p){return <PCard key={p.id} proj={p} initTab="stuck" startOpen={true}/>;})}</div>}
      {tab==="done"&&<div><p style={{color:"#9c9789",fontSize:13,margin:"0 0 14px 0"}}>Tasks completed in the last 7 days.</p>{withDone.length===0?<div style={{textAlign:"center",padding:48,color:"#78756d",fontSize:14}}>No completed tasks.</div>:withDone.sort(function(a,b){return b.done.length-a.done.length}).map(function(p){return <PCard key={p.id} proj={p} initTab="done" startOpen={true}/>;})}</div>}
      {tab==="up"&&<div><p style={{color:"#9c9789",fontSize:13,margin:"0 0 14px 0"}}>Tasks due in the next 7 days. Click any task to jump to GuideCX.</p>{withUp.length===0?<div style={{textAlign:"center",padding:48,color:"#78756d",fontSize:14}}>No upcoming tasks.</div>:withUp.sort(function(a,b){return b.up.length-a.up.length}).map(function(p){return <PCard key={p.id} proj={p} initTab="up" startOpen={true}/>;})}</div>}
      {tab==="fathom"&&<div><p style={{color:"#9c9789",fontSize:13,margin:"0 0 14px 0"}}>Fathom recordings from the last 14 days.</p>{meetings.length===0?<div style={{textAlign:"center",padding:48,color:"#78756d",fontSize:14}}>No meetings.</div>:meetings.map(function(m){return <FCard key={m.id} meeting={m}/>;})}</div>}
      {tab==="all"&&<div><p style={{color:"#9c9789",fontSize:13,margin:"0 0 14px 0"}}>All {fp.length} active projects. Click project or task names to open in GuideCX.</p>{fp.map(function(p){return <PCard key={p.id} proj={p} initTab="all"/>;})}</div>}
    </div></div>;}
