import { query, collection, Query, DocumentData, orderBy, limit, QuerySnapshot, getDocs } from 'firebase/firestore';
import News from '../models/News';
import { firestore } from '../services/firebase';

export default class NewsDAO {
  public async getLastestNews(): Promise<Object[]> {
    const documentsQuery: Query<DocumentData> = query(
      collection(firestore, 'public_news'),
      orderBy('createdAt', 'desc'),
      limit(3)
    );

    const querySnapshot: QuerySnapshot = await getDocs(documentsQuery);

    const newsList: Object[] = querySnapshot.docs.map(snap => {
      const aNews = new News(
        snap.data().title,
        snap.data().description,
        snap.data().argument,
        snap.data().createdAt);

      return aNews.getStructured();
    });

    return newsList;
  }
}
