import {rethrowBecause, notNull} from './utils';
import {simulateDatabaseFetch} from "./example_helpers";

async function documentDbFetchExample(){
    const document = await simulateDatabaseFetch('document_id')
        .catch(e=>rethrowBecause(e, 'Failed to fetch document from database'));
    if(notNull(document)){
        console.log(`Document found: ${document.document_content}`);
    } else {
        console.log('Document not found');
    }
}

documentDbFetchExample()
    .then(()=>console.log('Example completed'))
    .catch(e=>console.error(e));

/// Example output:
/// -----------------
/// Error: Failed to fetch document from database
//     at rethrowBecause (utils.ts:8:9)
//     at <anonymous> (examples.ts:7:19)
//     at async documentDbFetchExample (examples.ts:6:22) {
//   [cause]: Error: Database connection time out
//       at simulateDatabaseFetch (example_helpers.ts:12:15)
//       at documentDbFetchExample (examples.ts:6:28)
//       at <anonymous> (examples.ts:15:1)
//       at Object.<anonymous> (examples.ts:15:94)
//       at Module._compile (node:internal/modules/cjs/loader:1529:14)
//       at Object.transformer (node_modules\tsx\dist\register-DfubRCxM.cjs:2:823)
//       at Module.load (node:internal/modules/cjs/loader:1275:32)
//       at Module._load (node:internal/modules/cjs/loader:1096:12)
//       at cjsLoader (node:internal/modules/esm/translators:298:15)
//       at ModuleWrap.<anonymous> (node:internal/modules/esm/translators:240:7)
// }