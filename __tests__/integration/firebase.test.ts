import { describe, expect, it } from 'vitest';
import { firestore } from '../../src/services/firebase';
import { query, collection, getDocs, QuerySnapshot, doc, setDoc, Query, DocumentData } from "firebase/firestore";
import { v4 } from 'uuid';

type TestDocument = {
  description: string,
  type: string,
  createdAt: Date
}

describe('firebase connection tests', () => {
  it('shold to create a new document into firestore databae', async () => {
    const documentUuid: string = v4();
    const testDocument = doc(firestore, `test_collection/${documentUuid}`);

    const docData: TestDocument = {
      description: 'Test document',
      type: 'test',
      createdAt: new Date()
    }

    expect(await setDoc(testDocument, docData)).toBeUndefined();
  });

  it('shold return firebase collection type', async () => {
    const documentsQuery: Query<DocumentData> = query(collection(firestore, 'test_collection'));
    const querySnapshot: QuerySnapshot = await getDocs(documentsQuery);

    const docData: TestDocument = querySnapshot.docs[0].data() as TestDocument;

    expect(docData).toHaveProperty('type');
    expect(docData).toHaveProperty('description');
    expect(docData).toHaveProperty('createdAt');
  });
});
