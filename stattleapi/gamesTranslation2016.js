var fs = require('fs');
var gamesTranslation2016 = {
    "577ab62ad180718c2ead2fb9": "426ca435-c3a3-47e9-86ea-c127d0fbf38f",
    "577ab62ad180718c2ead2fba": "7a7fef8d-3343-4fa4-b282-e8277d1977fe",
    "577ab62ad180718c2ead2fbb": "bc709348-a9e2-47d7-bde2-6bb8c4a016b3",
    "577ab62ad180718c2ead2fbc": "c54b2aa3-64e6-4a70-843a-74fa5a8a76a2",
    "577ab62ad180718c2ead2fbd": "1e247342-ce1c-4a08-b675-76d82063a6e9",
    "577ab62ad180718c2ead2fbe": "6aad23e1-5ac6-4940-8261-b9af3167a71b",
    "577ab62ad180718c2ead2fbf": "7b04d7e2-92ca-4b74-ba13-34f18db05175",
    "577ab62ad180718c2ead2fc0": "824b8333-545c-4c17-995c-fcd965d4f7ac",
    "577ab62ad180718c2ead2fc1": "b4bc59f4-3893-4ff8-af07-3c70bc825b7a",
    "577ab62ad180718c2ead2fc2": "c0aaf0c1-c051-4f85-87d0-1b40ddab43f1",
    "577ab62ad180718c2ead2fc3": "c690a5d0-9311-459a-883b-7df85af23f6b",
    "577ab62ad180718c2ead2fc4": "d6dd3825-844e-43c6-8535-22f7760b0ad2",
    "577ab62ad180718c2ead2fc5": "dab72084-7a5d-4d4a-99b9-147e19102f12",
    "577ab62ad180718c2ead2fc6": "e2d2aab7-0aa2-44f6-9b5f-ee274ceae8ea",
    "577ab62ad180718c2ead2fc7": "f9bb72f4-2449-4ad0-ae18-de673692a3d7",
    "577ab62ad180718c2ead2fc8": "fbe8bf18-bc9a-4e2c-9dc7-7f847656c792",
    "577ab62ad180718c2ead2fc9": "24d48d72-4556-4cc2-af3c-1f306b8cea37",
    "577ab62ad180718c2ead2fca": "9ae5f08d-7a08-4b0c-a915-9d2a5f85536e",
    "577ab62ad180718c2ead2fcb": "d18d125b-2e68-4779-b8c7-b01465eb5196",
    "577ab62ad180718c2ead2fcc": "bbb20253-9f13-49cc-8afa-719a13a11d3d",
    "577ab62ad180718c2ead2fcd": "45f7e533-a2cc-460c-a3dc-7d2159dbd63f",
    "577ab62ad180718c2ead2fce": "b044b5e9-611d-400c-baeb-b0a54123d0d1",
    "577ab62ad180718c2ead2fcf": "7f59643c-49fc-43ed-93c0-e924113a9f83",
    "577ab62ad180718c2ead2fd0": "24f27291-d59d-4af1-a4d9-995e7ba3d3d6",
    "577ab62ad180718c2ead2fd1": "4b371f22-c95b-40f8-b900-00dbacb90047",
    "577ab62ad180718c2ead2fd2": "704ccae6-47ae-4840-bf22-c2d158dd3893",
    "577ab62ad180718c2ead2fd3": "a3421cae-5875-4c57-aab1-1a240bdebc80",
    "577ab62ad180718c2ead2fd5": "b1ace4b5-483d-48f3-bdc5-ad3bc6bd8deb",
    "577ab62ad180718c2ead2fd6": "f3b8890e-ea9a-4e94-9569-2b2423ea14e8",
    "577ab62ad180718c2ead2fd4": "afa66e33-3804-4459-8f4f-1a46e0723886",
    "577ab62ad180718c2ead2fd7": "fd3baf56-3549-4bfe-987e-c3ec676340d3",
    "577ab62ad180718c2ead2fd8": "5abc37f1-7ea3-417a-b45c-4fa9c278fafb",
    "577ab62ad180718c2ead2fd9": "33ea9a2e-5097-4efa-b946-aa96e2d6acec",
    "577ab62ad180718c2ead2fda": "c95576b6-6d65-4c34-bec5-8e1f7696c5c9",
    "577ab62ad180718c2ead2fdb": "bef493ae-5ee6-4818-bebf-6aba392def34",
    "577ab62ad180718c2ead2fdc": "e53bfe9a-f347-4bff-a8b4-7cadf1a724a9",
    "577ab62ad180718c2ead2fdd": "9c6478ed-d88c-48db-8e5a-d9c60d5f7e91",
    "577ab62ad180718c2ead2fde": "adbc470b-38d8-49ad-a2a7-eae1a54cf4eb",
    "577ab62ad180718c2ead2fdf": "0bd5a3c2-141b-446e-a8e6-f9cb9cef29a7",
    "577ab62ad180718c2ead2fe0": "1ec3617d-0e97-4d8e-bd5f-6e71946ddc7e",
    "577ab62ad180718c2ead2fe1": "4b3c4a9c-9126-4749-8c6f-698e0fe3248e",
    "577ab62ad180718c2ead2fe2": "74a8d36a-7309-4467-8df9-40bc8d01469a",
    "577ab62ad180718c2ead2fe3": "860de639-6c57-4cf9-b848-290726dfa477",
    "577ab62ad180718c2ead2fe4": "93814d31-fe79-460d-a993-6fed483cbc41",
    "577ab62ad180718c2ead2fe5": "c4383e60-b505-43c0-9363-f6f6a468d772",
    "577ab62ad180718c2ead2fe6": "dd5ede60-07d0-42b3-8fa8-80b2469bf370",
    "577ab62ad180718c2ead2fe7": "a129cb41-b293-4ad1-bd7d-335e861da96b",
    "577ab62ad180718c2ead2fe8": "2653ed36-19e7-4289-b757-db36afd707e7",
    "577ab62ad180718c2ead2fe9": "969f754b-44bb-4109-9d97-0774f6cd3a0c",
    "577ab62ad180718c2ead2fea": "6aff1ee1-89b4-4aec-ad5c-b7d7b98f3189",
    "577ab62ad180718c2ead2feb": "9bf9d6ef-f8f7-4ef4-b7d7-e50ff6ca68da",
    "577ab62ad180718c2ead2fec": "e0c8aef2-33b5-4907-ac94-bf7f8254dc89",
    "577ab62ad180718c2ead2fed": "df80188d-4144-4ffe-872b-b62bd16657c2",
    "577ab62ad180718c2ead2fee": "0ae151b3-0424-4dd3-89d5-2129411515fc",
    "577ab62ad180718c2ead2fef": "26986ab9-aad7-48ad-aec2-78b5292f9b56",
    "577ab62ad180718c2ead2ff0": "7b64f573-5a32-4d79-92c8-47fc1e014ec8",
    "577ab62ad180718c2ead2ff1": "8dbe4a85-0477-4093-9263-9deebe6c09ca",
    "577ab62ad180718c2ead2ff2": "ad5ca50e-4121-4602-94b1-5451912d5222",
    "577ab62ad180718c2ead2ff3": "cf7db2e0-7a7b-4d0e-882e-6a805a5202e1",
    "577ab62ad180718c2ead2ff4": "d6428176-4437-4c53-afce-ea40607c1b08",
    "577ab62ad180718c2ead2ff5": "f7ee2cad-b638-440d-972a-ac9f4e8a1dab",
    "577ab62ad180718c2ead2ff6": "fbd3de2f-5021-4e12-9d6a-6ce352863200",
    "577ab62ad180718c2ead2ff7": "ff2bc902-e6c7-4897-a466-62b7c4525b77",
    "577ab62ad180718c2ead2ff8": "94a8342a-a9c0-4f55-9b46-34568b827dda",
    "577ab62ad180718c2ead2ff9": "1096e74c-0ffd-4035-bf50-f8e58ab3301a",
    "577ab62ad180718c2ead2ffa": "9a2523bb-e0b6-4456-a1a1-9af4d9a07000",
    "577ab62ad180718c2ead2ffb": "1888d926-06c4-472c-8290-1ad032dc3537",
    "577ab62ad180718c2ead2ffc": "8d5796b2-32d8-494b-b88f-7442fbbaee1b",
    "577ab62ad180718c2ead2ffd": "c7efc91d-0470-463f-b10b-0673c04acc71",
    "577ab62ad180718c2ead2ffe": "fb5991b0-fc30-401d-9301-51324bd18585",
    "577ab62ad180718c2ead2fff": "153d3b70-cb51-4741-b636-1927c91d4229",
    "577ab62ad180718c2ead3000": "1ebcc867-ac3f-46ca-8017-f8537d37898e",
    "577ab62ad180718c2ead3001": "2352d8d7-8e19-4ab5-a5f4-64a8a33fa8b7",
    "577ab62ad180718c2ead3002": "73ed5e6e-edb9-427a-b76e-479b080e4c68",
    "577ab62ad180718c2ead3003": "7eaf4a15-a99d-43d3-a937-67a415c00210",
    "577ab62ad180718c2ead3004": "857dfcaf-234f-478e-af6f-6f16abcd836b",
    "577ab62ad180718c2ead3005": "c21e71e6-12fb-4414-bcb2-73a7f823f51d",
    "577ab62ad180718c2ead3006": "f8d2090e-ba1b-4c1b-9532-47904d7e6c9d",
    "577ab62ad180718c2ead3007": "264dce63-f356-43da-aafc-d5d3b5afe35e",
    "577ab62ad180718c2ead3008": "122196ef-4df1-49e2-8344-acd7fcd1f80e",
    "577ab62ad180718c2ead3009": "a9e0d380-a3df-476f-b4af-6861bc941d85",
    "577ab62ad180718c2ead300a": "7d99940f-8d6c-4355-8b83-cf1f032f2410",
    "577ab62ad180718c2ead300b": "8593c5ec-727d-4aa2-9e7b-168f6be698d5",
    "577ab62ad180718c2ead300c": "73725a16-9169-400e-9168-49459c046693",
    "577ab62ad180718c2ead300d": "2ee4fc6a-f603-403d-a9ba-bfd971cb5bf4",
    "577ab62ad180718c2ead300e": "4cd722a0-38a6-494e-9406-7c7f7d186cf3",
    "577ab62ad180718c2ead300f": "6f392880-3e8d-445b-af4a-4e07a6d7cbc5",
    "577ab62ad180718c2ead3010": "8b21dc7b-a32b-4df3-a866-881f39976cfa",
    "577ab62ad180718c2ead3011": "8ebce671-61a1-4325-a5be-6fd5e4838cee",
    "577ab62ad180718c2ead3012": "a4d0254d-e972-405e-a031-720db7594e57",
    "577ab62ad180718c2ead3013": "e2780c47-0e22-477a-823a-4a47a9dcb03a",
    "577ab62ad180718c2ead3014": "f70f0073-62d4-4258-8588-654858922751",
    "577ab62ad180718c2ead3015": "6b956b9a-93a9-448b-b66c-36324000176f",
    "577ab62ad180718c2ead3016": "d4102da6-05d1-4c38-8112-3ec26bcb208b",
    "577ab62ad180718c2ead3017": "8af508c6-c401-4b8d-b39d-2dc24676b076",
    "577ab62ad180718c2ead3018": "c5231d23-3bc1-4392-b020-28c3cb5f2af8",
    "577ab62ad180718c2ead3019": "09550015-efc3-4136-a862-79602f4ece4f",
    "577ab62ad180718c2ead301a": "5146488f-de3a-45ce-9fff-fe759e60565e",
    "577ab62ad180718c2ead301b": "c94ed957-1947-48cd-86c9-dfe377dc2558",
    "577ab62ad180718c2ead301c": "73e88dd1-ceb4-4f4b-a780-bd24c1567b9b",
    "577ab62ad180718c2ead301d": "19b07833-838d-4613-858b-c1ce19b25bd1",
    "577ab62ad180718c2ead301e": "2c19295a-6e98-4ac8-ac87-fd6e1319ce61",
    "577ab62ad180718c2ead301f": "4c215559-4f45-487e-9122-0b98f4302c23",
    "577ab62ad180718c2ead3020": "5fa9978d-a692-4775-86ef-94290aa34d1c",
    "577ab62ad180718c2ead3021": "7ce3d99d-4d92-491f-b1bf-902b47402351",
    "577ab62ad180718c2ead3022": "9251268b-9b94-495f-bb26-f2c974ebf6b2",
    "577ab62ad180718c2ead3023": "a74213c3-9f2c-478a-af71-5ae91dcf21aa",
    "577ab62ad180718c2ead3024": "d344a2ea-e94e-4d7a-944d-7468b620ee24",
    "577ab62ad180718c2ead3025": "efa081d7-d211-41fb-9814-45ad9e21ecc5",
    "577ab62ad180718c2ead3026": "faab2905-4aa7-42ac-bbed-8f5198c28ec2",
    "577ab62ad180718c2ead3027": "2902baad-c88a-47a0-84f1-9af601e7a64c",
    "577ab62ad180718c2ead3028": "0852e900-f05c-45f7-82eb-d9afcee1dfca",
    "577ab62ad180718c2ead3029": "4ca0bdaa-6a62-44a5-be63-2ed9733f1880",
    "577ab62ad180718c2ead302a": "a22355e0-4cc8-447f-89d1-494be4296b84",
    "577ab62ad180718c2ead302b": "1d8cad88-46c9-4036-b194-b0f422523f1b",
    "577ab62ad180718c2ead302c": "201f3f0d-c8a2-4369-89bc-4f9ee33facba",
    "577ab62ad180718c2ead302d": "49d107dc-85d1-4541-b4c5-8bbc1c0feaff",
    "577ab62ad180718c2ead302e": "69d48b10-904c-4b90-a1c1-3544203a810e",
    "577ab62ad180718c2ead302f": "ab7f7676-946f-4f5d-b2a3-7df117852a0e",
    "577ab62ad180718c2ead3030": "c9334350-c216-4d4a-a22c-2f1e4b8ca7bc",
    "577ab62ad180718c2ead3031": "e6f2a00f-79b3-485a-aaf9-4a3e4868a254",
    "577ab62ad180718c2ead3032": "f2167215-0af9-4cab-8221-e9c4b7bfcc5b",
    "577ab62ad180718c2ead3033": "6ec860fc-4a63-4877-9f5e-b00e607dab2d",
    "577ab62ad180718c2ead3034": "9e9ec0dd-33de-4b17-8b0d-589812dd7b26",
    "577ab62ad180718c2ead3035": "4983d604-4d10-4ed8-8595-e48edf8f9fcd",
    "577ab62ad180718c2ead3036": "7f0cbfb4-c100-4b2e-a109-e7bb5265c586",
    "577ab62ad180718c2ead3037": "b023652f-e940-415d-858a-151288794e94",
    "577ab62ad180718c2ead3038": "72f2e6c3-01f5-458c-abc0-aae02015fa9c",
    "577ab62ad180718c2ead3039": "bb629161-3a23-486c-a271-573c876cac81",
    "577ab62ad180718c2ead303a": "377bd87f-0fcc-4eb5-a19d-ac00f0b416e3",
    "577ab62ad180718c2ead303b": "8a8ea0d7-5ce0-4ec2-8aa4-e9c6ba6f153d",
    "577ab62ad180718c2ead303c": "95fa8398-f0fe-4249-9876-a7f35ebd12e8",
    "577ab62ad180718c2ead303d": "be710e8e-d123-46f8-b978-71385f6e0008",
    "577ab62ad180718c2ead303e": "cedee016-988f-4d37-93b6-7b2430f369c7",
    "577ab62ad180718c2ead303f": "e67aeb8f-e40a-4adc-bf42-8fc8d76c0b03",
    "577ab62ad180718c2ead3040": "d51fecf0-743b-424d-a1f1-ef745e8e403c",
    "577ab62ad180718c2ead3041": "1fa1999b-6d8b-4fa8-87e8-2554b9691e0b",
    "577ab62ad180718c2ead3042": "380c0dd1-dd9b-41dc-a197-e43789d0d907",
    "577ab62ad180718c2ead3043": "62d103ca-e24e-4857-a246-183500e4606b",
    "577ab62ad180718c2ead3044": "843bc634-71bb-4157-91e6-1375737e8b7a",
    "577ab62ad180718c2ead3045": "5a168d6d-90b9-42d6-bfc6-cd7c349744b4",
    "577ab62ad180718c2ead3046": "82ffab4c-4eb4-44e7-8b2e-3b888080382f",
    "577ab62ad180718c2ead3047": "9064f3b9-8b0c-4f3f-ab6c-4074cd6e2e42",
    "577ab62ad180718c2ead3048": "95ff5e12-c36e-4bf6-997f-393db68ca874",
    "577ab62ad180718c2ead3049": "a0950dee-a4ea-402b-9cf3-d0852f638874",
    "577ab62ad180718c2ead304a": "cd584d5f-f2f9-401e-9a64-26142c3227bd",
    "577ab62ad180718c2ead304b": "e2194169-b877-4128-92fc-7d63ba19fe25",
    "577ab62ad180718c2ead304c": "7a02eb2f-83a6-41ec-84cb-4ecf7ac8dd64",
    "577ab62ad180718c2ead304d": "90ee7d7e-35ad-46f0-80bc-525175704101",
    "577ab62ad180718c2ead304e": "c254d9e1-b99c-421f-8750-daed3e7c40c6",
    "577ab62ad180718c2ead304f": "ce279c77-f0f3-4786-928d-f84772b1a194",
    "577ab62ad180718c2ead3050": "c0673d23-71fa-4e65-a44f-2578668aa309",
    "577ab62ad180718c2ead3051": "448e0464-f1d5-4184-851f-4d3036fe6a67",
    "577ab62ad180718c2ead3052": "fe646485-7460-4527-9dfb-6c37fcfe0ef9",
    "577ab62ad180718c2ead3053": "1e0342ec-9c32-446c-98ea-0d1156116de9",
    "577ab62ad180718c2ead3054": "57504015-4b8c-4f7f-89f7-5bcaf6ca06dc",
    "577ab62ad180718c2ead3055": "879969ff-1ed0-4d7b-87fe-9d5723353c5f",
    "577ab62ad180718c2ead3056": "9e0155ff-1654-48f4-87ae-852f46e19a30",
    "577ab62ad180718c2ead3057": "abd1b639-9e6d-42af-8619-62210aa7877a",
    "577ab62ad180718c2ead3058": "ac639ace-7e40-4d0f-9800-c7b065af29e4",
    "577ab62ad180718c2ead3059": "b1876c18-d684-44f2-a44d-d606fe5ce14e",
    "577ab62ad180718c2ead305a": "d603fd0b-fde1-4dc2-b107-eb0ab8e87527",
    "577ab62ad180718c2ead305b": "dedac69d-38ea-4d46-9d18-cd318629b697",
    "577ab62ad180718c2ead305c": "e8ad99c8-590b-4f45-b5e8-eb402f2c3849",
    "577ab62ad180718c2ead305d": "817a7908-82bc-44ff-87b1-9a89c9bdd382",
    "577ab62ad180718c2ead305e": "d2902e51-d2f0-428d-8872-bd59fdefd50d",
    "577ab62ad180718c2ead305f": "14889a3f-21c9-486e-8d3b-bef34a77fb4e",
    "577ab62ad180718c2ead3060": "747e99e1-3179-4c54-8c02-90866e5f141b",
    "577ab62ad180718c2ead3061": "918f2840-d7a9-4781-8fa2-c2c80dd2db39",
    "577ab62ad180718c2ead3062": "305b0953-7ba7-472e-87ff-d17e23d531df",
    "577ab62ad180718c2ead3063": "3df32005-1321-45b0-8c13-94e35c707b1f",
    "577ab62ad180718c2ead3064": "46e14f9c-f141-4f05-9ca3-86df31323e9c",
    "577ab62ad180718c2ead3065": "83754253-9004-4cea-9172-add391c3811e",
    "577ab62ad180718c2ead3066": "8e701bf0-7615-4469-9e39-92613caadd79",
    "577ab62ad180718c2ead3067": "9b446283-105f-43fe-8c16-5d8a359d4304",
    "577ab62ad180718c2ead3068": "bd158a14-4d33-45a2-8b3d-26cbeb656058",
    "577ab62ad180718c2ead3069": "cb4d5992-5eab-4323-98a8-10ceaea3dab7",
    "577ab62ad180718c2ead306a": "cb9d26f3-451b-48a3-a41b-443336323841",
    "577ab62ad180718c2ead306b": "bb9be607-ecaa-4ce9-b378-07c32f44f89b",
    "577ab62ad180718c2ead306c": "a8b4d224-b2e9-4c9e-abcd-ad308b2794d7",
    "577ab62ad180718c2ead306d": "fa1e25ba-4ee3-4d7c-a814-f563554623e1",
    "577ab62ad180718c2ead306e": "27e16155-d60a-47b0-9ed9-24e1c996c0d2",
    "577ab62ad180718c2ead306f": "46bb019a-f6a7-482e-b497-f150604018ae",
    "577ab62ad180718c2ead3070": "815f747e-fcce-43b4-aebc-467fd92a9ff6",
    "577ab62ad180718c2ead3071": "76c4308d-e3c4-41f9-b7ca-66f059b28949",
    "577ab62ad180718c2ead3072": "19ee6068-e8aa-46e5-b687-68e7744a5176",
    "577ab62ad180718c2ead3073": "46a90482-4516-4363-b5e8-b21c1d57a9e0",
    "577ab62ad180718c2ead3074": "895ff6fc-0bd7-4b16-a4f8-d973f240e8e8",
    "577ab62ad180718c2ead3075": "94dd4748-f43b-4861-b950-d3ac3da789c3",
    "577ab62ad180718c2ead3076": "9a48d3c0-6929-4680-957d-3f3f1a915d97",
    "577ab62ad180718c2ead3077": "b044af02-8f76-4e17-abcb-3872069b91a4",
    "577ab62ad180718c2ead3078": "f739e421-9cc6-4efd-980b-0c82c1261c7d",
    "577ab62ad180718c2ead3079": "33aca400-4e74-4cf5-b2be-7bdbadfbd4cb",
    "577ab62ad180718c2ead307a": "67879b21-f77c-44e6-aad4-46458fe7ef45",
    "577ab62ad180718c2ead307b": "921179d9-b6fd-44fa-88c5-a4cb22721dea",
    "577ab62ad180718c2ead307c": "039aeaea-3318-4104-8f7a-05faa2ecdc6a",
    "577ab62ad180718c2ead307d": "73328c1b-0c06-49ea-b234-3e8a46f4b892",
    "577ab62ad180718c2ead307e": "9e5664d2-7c20-4f5f-ad50-5f26aa3a85f2",
    "577ab62ad180718c2ead307f": "d2def271-f1c4-4aa0-ac89-4ed3674e8162",
    "577ab62ad180718c2ead3080": "0e7ca27e-0d7e-4389-88e0-ce4627d8aae3",
    "577ab62ad180718c2ead3081": "7ac84b68-16d9-4616-8a35-7fd16746baa7",
    "577ab62ad180718c2ead3082": "82f117b1-af8d-4d61-b2e3-098acb833e83",
    "577ab62ad180718c2ead3083": "9fe930a8-8b68-4fa9-8c1f-8796d46da638",
    "577ab62ad180718c2ead3084": "bf13c86c-ecf9-46bf-865b-fccd368c0466",
    "577ab62ad180718c2ead3085": "c7f381da-e67b-4ef8-a4ea-82adceaba44f",
    "577ab62ad180718c2ead3086": "ccd5fb1f-79b3-49d8-a5ef-11c6efdb29d8",
    "577ab62ad180718c2ead3087": "a882f64d-08d2-423e-80bd-690375fc8156",
    "577ab62ad180718c2ead3088": "c3a15f0a-0258-458e-966d-e47ebee14c4c",
    "577ab62ad180718c2ead3089": "08e45768-0bcc-4bc0-922d-2e3b58d3cddd",
    "577ab62ad180718c2ead308a": "e92da4e5-dc72-46af-bacc-3f97ff354393",
    "577ab62ad180718c2ead308b": "0441fbb4-6c66-46a0-8708-ed19bf5017a0",
    "577ab62ad180718c2ead308c": "0a81fc83-a9f5-45a6-8f61-be478b05277d",
    "577ab62ad180718c2ead308d": "e3dfa16c-71a6-4f6e-881d-2630ac47608c",
    "577ab62ad180718c2ead308e": "6c188421-61b8-42ab-ae3d-ea33a8fcaf14",
    "577ab62ad180718c2ead308f": "e2f4f885-b95e-4abf-a421-59cbefa39932",
    "577ab62ad180718c2ead3090": "286a6a8d-d24e-4335-8502-ca18eb01bc74",
    "577ab62ad180718c2ead3091": "324acd6a-7daf-494d-8653-df4045c82f9e",
    "577ab62ad180718c2ead3092": "3b1c1cb8-3ccd-4fbb-9e08-999bdf7683cf",
    "577ab62ad180718c2ead3093": "4387d697-7e1c-4646-a5be-4962ad9b2240",
    "577ab62ad180718c2ead3094": "60e5013c-dd7f-4d0a-8439-4f31576d2a22",
    "577ab62ad180718c2ead3095": "70354992-6671-45dd-a9de-d86387599675",
    "577ab62ad180718c2ead3096": "ca6ebeaa-0a49-4c82-9d55-f0abc9cc43ea",
    "577ab62ad180718c2ead3097": "e79cd2eb-f0e3-4570-86e7-deec0f405cf2",
    "577ab62ad180718c2ead3098": "e4972d8d-2739-45c9-abd0-44d363e75407",
    "577ab62ad180718c2ead3099": "8e2f157d-2a97-4530-8a45-50630174aa0a",
    "577ab62ad180718c2ead309a": "35a4245a-ec37-4455-944e-37c54b795b4e",
    "577ab62ad180718c2ead309b": "2d39d183-44a3-40e9-84bc-1cdad0f651ac",
    "577ab62ad180718c2ead309c": "701974d3-78e7-4a36-88ad-7febe6495792",
    "577ab62ad180718c2ead309d": "8996cb08-99b1-42ed-835e-6c8f44c75d43",
    "577ab62ad180718c2ead309e": "0cb2ec66-8e89-4856-90f1-74bbedd8f963",
    "577ab62ad180718c2ead309f": "a9c649b3-970d-43a7-8929-d85ae4123c29",
    "577ab62ad180718c2ead30a0": "1f32a7df-4191-4da8-aad3-b57291c30e11",
    "577ab62ad180718c2ead30a1": "57eb232d-da95-4b37-95e4-10f228001dd9",
    "577ab62ad180718c2ead30a2": "6eaba679-4f5c-4138-9afb-79c6446a7d05",
    "577ab62ad180718c2ead30a3": "7e11bc1d-42f4-4c56-8496-88e636b00906",
    "577ab62ad180718c2ead30a4": "ae233d83-58ce-4f87-9d5b-1c03386854de",
    "577ab62ad180718c2ead30a5": "cab4c855-2ecc-44e3-95ba-f2feec00862e",
    "577ab62ad180718c2ead30a6": "ccf82b05-0768-4047-8096-64bcc6df6c02",
    "577ab62ad180718c2ead30a7": "d2d81291-1d07-4aa8-9be2-670ff90be2b3",
    "577ab62ad180718c2ead30a8": "1b1924df-43b5-4011-9935-756c1640bf2f",
    "577ab62ad180718c2ead30a9": "dcc726ba-79ae-4569-83aa-bc5341c9cffc",
    "577ab62ad180718c2ead30aa": "e0875001-e0a6-455c-95c9-175c782bea2e",
    "577ab62ad180718c2ead30ab": "a6d34676-e58c-4058-ad95-12cb6446c072",
    "577ab62ad180718c2ead30ac": "98ee26b4-ef02-4fa1-9c1a-690ce18b7551",
    "577ab62ad180718c2ead30ad": "ae8ea248-5cbb-4852-ad25-7303deeb02cc",
    "577ab62ad180718c2ead30ae": "8e151cbb-71c3-483d-9fd5-a09973998c02",
    "577ab62ad180718c2ead30af": "67b0f196-d365-49d6-9319-64072507dc93",
    "577ab62ad180718c2ead30b0": "706275a7-fa09-40b2-b50a-ba217dcbf23a",
    "577ab62ad180718c2ead30b1": "7c8fb13e-76ce-4a3f-a1f7-da0574ecc94c",
    "577ab62ad180718c2ead30b2": "9eb5e53f-7c05-4558-ac53-011d2990d0b1",
    "577ab62ad180718c2ead30b3": "b30f8d78-f8e3-4e73-9cc2-9bba9e980134",
    "577ab62ad180718c2ead30b4": "c9ce19af-b9cb-435c-8026-b1abf6aabbe0",
    "577ab62ad180718c2ead30b5": "cdee2ee3-a825-4917-9c44-e8c4a6b5bf44",
    "577ab62ad180718c2ead30b6": "ea627c79-1f0b-4938-be25-1ac79a783962",
    "577ab62ad180718c2ead30b7": "f04325fe-100c-4c18-8d54-9ee76d4e7c67",
    "577ab62ad180718c2ead30b8": "fb9c4a84-9345-4d4a-86f5-8ad7ff53c533"
}
var gamesLocalToStattle2016 = JSON.parse(fs.readFileSync('./season2016translation.json'));
var translationService = {
    gameLookup : function(gameId) {
        return gamesTranslation2016[gameId];
    },
    gameSlugLookUp : function (gameId){
      return gamesLocalToStattle2016[gameId];
    }
}
module.exports = translationService;