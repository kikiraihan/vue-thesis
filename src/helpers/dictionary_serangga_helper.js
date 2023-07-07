export function _grupkanDataPerBaris(dict_serangga){
    // groupedData[family] = [];
    const groupedData = {};
    for (let i = 0; i < dict_serangga['family'].length; i++) {
        const family = dict_serangga['family'][i];
        const featureVector1 = dict_serangga['feature-vector-1'][i];
        const featureVector2 = dict_serangga['feature-vector-2'][i];
        const name = dict_serangga['name'][i];

        if (!groupedData[family]) {
            groupedData[family] = [];
        }

        groupedData[family].push({
            'feature-vector-1': featureVector1,
            'feature-vector-2': featureVector2,
            'name': name
        });
    }
    return groupedData;

    // from
    // const dict_serangga = {
    // 'feature-vector-1': [2, 1, 3, 1],
    // 'feature-vector-2': [4, 2, 4, 5],
    // 'family': ["belalang", "kumbang", "belalang", "katak"],
    // 'name': ["apa", "wolo", "nama", "waw"]
    // };
    // to
    // {
    //     'belalang': [
    //         {
    //         'feature-vector-1': 2,
    //         'feature-vector-2': 4,
    //         'name': 'apa'
    //         },
    //         {
    //         'feature-vector-1': 3,
    //         'feature-vector-2': 4,
    //         'name': 'nama'
    //         }
    //     ],
    //     'kumbang': [
    //         {
    //         'feature-vector-1': 1,
    //         'feature-vector-2': 2,
    //         'name': 'wolo'
    //         }
    //     ],
    //     'katak': [
    //         {
    //         'feature-vector-1': 1,
    //         'feature-vector-2': 5,
    //         'name': 'waw'
    //         }
    //     ]
    // }
}

export function _grupkanDataPerKolom(dict_serangga){
    const newData = {};
    for (let i = 0; i < dict_serangga['family'].length; i++) {
        const family = dict_serangga['family'][i];
        const feature1 = dict_serangga['feature-vector-1'][i];
        const feature2 = dict_serangga['feature-vector-2'][i];
        const name = dict_serangga['name'][i];

        if (!newData[family]) {
            newData[family] = {
            'feature-vector-1': [],
            'feature-vector-2': [],
            'name': []
            };
        }

        newData[family]['feature-vector-1'].push(feature1);
        newData[family]['feature-vector-2'].push(feature2);
        newData[family]['name'].push(name);
    }
    return newData;

    // from
    // const dict_serangga = {
    // 'feature-vector-1': [2, 1, 3, 1],
    // 'feature-vector-2': [4, 2, 4, 5],
    // 'family': ["belalang", "kumbang", "belalang", "katak"],
    // 'name': ["apa", "wolo", "nama", "waw"]
    // };
    // to
    // const new = {
    //     'belalang': {
    //         'feature-vector-1': [2, 3],
    //         'feature-vector-2': [4, 4],
    //         'name': ['apa', 'nama']
    //     },
    //     'kumbang': {
    //         'feature-vector-1': [1],
    //         'feature-vector-2': [2],
    //         'name': ['wolo']
    //     },
    //     'katak': {
    //         'feature-vector-1': [1],
    //         'feature-vector-2': [5],
    //         'name': ['waw']
    //     }
    // }
}