/** represents a document stored in a database */
export type DbDocument = {
    document_id: string;
    document_content: string;
}

/** Simulates a database fetch operation which can successfully find a document, find no document, or fail with error */
export async function simulateDatabaseFetch(document_id: string): Promise<DbDocument | null> {
    const isDocumentFound = Math.random() > 0.5;
    const isErrored = Math.random() > 0.5;
    if(isErrored){
        throw new Error('Database connection time out');
    }
    if(isDocumentFound){
        return {
            document_id,
            document_content: 'This is the document content'
        };
    } else {
        return null;
    }
}