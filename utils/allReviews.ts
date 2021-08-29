import 'react-native-get-random-values';
import { v4 as uuid } from "uuid";

interface PropsType {
  name: string;
  id: string;
  avatar: string;
  dated: Date;
  review: string;
  rating: number;
  upVotes: number;
  downVotes: number;
}

export const allReviews: Array<PropsType> = [
  {
    name: "Waleed Tariq",
    id: uuid(),
    avatar:
      "https://st2.depositphotos.com/1007566/12304/v/950/depositphotos_123041468-stock-illustration-avatar-man-cartoon.jpg",
    dated: new Date(),
    review:
      "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound",
    rating: 5,
    upVotes: 25,
    downVotes: 2,
  },
  {
    name: "Sameer Tariq",
    id: uuid(),
    avatar:
      "https://thumbs.dreamstime.com/b/face-man-beard-mustache-face-appearance-single-icon-cartoon-style-vector-symbol-stock-illustration-98397077.jpg",
    dated: new Date(),
    review:
      "My positive reviews tend to all sound the same – honestly, you kind of DO want to say the same thing over and over, uneventful positive interactions are my goal! I make a point of saying that the guest was kind to my pets, if that is the case, because I know as a home host with pets in the house, that’s the sort of thing I’d like to know.",
    rating: 4,
    upVotes: 25,
    downVotes: 2,
  },
  {
    name: "Nasir Sheikh",
    id: uuid(),
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1JmPlC4bX7m-cUkOkCBh6ZujHiXRERNlnzA&usqp=CAU",
    dated: new Date(),
    review: "Good guest; welcome back anytime!",
    rating: 5,
    upVotes: 25,
    downVotes: 2,
  },
  {
    name: "Umer Sheikh",
    id: uuid(),
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQygS9wR2T9-FfEvuV5DlY4nOhfxJuAx2Z3Qg&usqp=CAU",
    dated: new Date(),
    review:
      "Guest) left the place incredibly tidy. He (or She) was more or less the perfect guest and I’d recommend him to any host.",
    rating: 3,
    upVotes: 25,
    downVotes: 2,
  },
  {
    name: "Tariq Jamil",
    id: uuid(),
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmuNB6rLDi4QRgWdNo1VPn_ynPfULaX09-Kw&usqp=CAU",
    dated: new Date(),
    review:
      "Guest) was very communicative. Scheduling times for check-in and check-out was simple and easy. A super smooth stay. Welcome back anytime.",
    rating: 4,
    upVotes: 25,
    downVotes: 2,
  },
  {
    name: "Nimra Hayat",
    id: uuid(),
    avatar:
      "https://png.pngtree.com/element_our/20190603/ourmid/pngtree-serious-thinking-girl-with-a-pen-image_1442023.jpg",
    dated: new Date(),
    review:
      "(Guest) is a (occupation) who was very respectful of my belongings. No problems whatsoever. Highly recommended! Welcome back whenever",
    rating: 5,
    upVotes: 25,
    downVotes: 2,
  },
  {
    name: "Donal Trump",
    id: uuid(),
    avatar:
      "https://deadline.com/wp-content/uploads/2017/12/cartoon-donald-trump.jpg",
    dated: new Date(),
    review: "Very bad service. Nothing compared to my trump towers!",
    rating: 1,
    upVotes: 25,
    downVotes: 2,
  },
  {
    name: "Jhonny",
    id: uuid(),
    avatar:
      "https://i.pinimg.com/originals/1e/ef/72/1eef72823743d9c47d8840e55b0823f0.png",
    dated: new Date(),
    review:
      "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound",
    rating: 1,
    upVotes: 25,
    downVotes: 2,
  },
  {
    name: "Imran Khan",
    id: uuid(),
    avatar:
      "https://d2l6sh6ci8bhhq.cloudfront.net/wp-content/uploads/2018/06/19072921/Imran-Khan-P18.jpg",
    dated: new Date(),
    review: "Maza nai aya woye",
    rating: 2,
    upVotes: 25,
    downVotes: 2,
  },
  {
    name: "Nasir Junjua",
    id: uuid(),
    avatar:
      "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png",
    dated: new Date(),
    review: "Fantastic Experience",
    rating: 5,
    upVotes: 25,
    downVotes: 2,
  },
];
