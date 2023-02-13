function addQuotes(input) {

    const dict = ["AccountType:string",
        "ExperimentId:string,",
        "StageId:string",
        "Experiment:string",
        "ExpStartDateTime:DateTime",
        "Variant:string",
        "VariantFlight:string",
        "AssignmentId:string",
        "AssignmentType:string",
        "FirstDateTimeofAction:DateTime",
        "LastDateTimeofAction:DateTime",
        "IsExperimentRetired:bool"

    ]
    const arr = [];
    for (const item of dict) {
        const parts = item.split(":");
        console.log(JSON.stringify({ "name": parts[0], "type": parts[1], "privacyCategory": "SystemMetadata" }) + ",")
        arr.push(parts[0])
    }

    console.log(JSON.stringify(arr));
}

addQuotes("")