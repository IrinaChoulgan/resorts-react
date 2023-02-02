import React, { useState, useContext } from 'react';
import defaultBcg from '../images/room-1.jpeg';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link, useParams } from 'react-router-dom';
import { RoomContext } from '../context';
import StyledHero from '../components/StyledHero';

// export default class SingleRoom extends Component {
//   constructor(props) {
//     super(props);
//     //console.log(this.props);
//   }

//   componentDidMount() {}
//   render() {
//     return <div>Hello from SingleRoom page</div>;
//   }
// }

export default function SingleRoom() {
  const { slug } = useParams();
  const [slugRoom, setSlugRoom] = useState(slug);
  const [defaultBcgRoom, setDefaultBcgRoom] = useState(defaultBcg);

  const { getRoom } = useContext(RoomContext);
  const room = getRoom(slugRoom);
  const [mainImg, ...defaultImg] = room.images;

  return (
    <>
      {!room ? (
        <div className="error">
          <h3>no such room could be found</h3>
          <Link to="/room" className="btn-primary">
            back to rooms
          </Link>
        </div>
      ) : (
        <StyledHero img={mainImg || defaultBcgRoom}>
          <Banner title={`${room?.name} room`}>
            <Link to="/rooms" className="btn-primary">
              back to rooms
            </Link>
          </Banner>
        </StyledHero>
      )}
      <section className="single-room">
        <div className="single-room-images">
          {defaultImg.map((item, index) => {
            return <img key={index} src={item} alt={room?.name} />;
          })}
        </div>
        <div className="single-room-info">
          <article className="desc">
            <h3>details</h3>
            <p>{room?.description}</p>
          </article>
          <article className="info">
            <h3>info</h3>
            <h6>price : ${room?.price}</h6>
            <h6>size : ${room?.size} SQFT</h6>
            <h6>
              max capacity : {room?.capacity > 1 ? `${room?.capacity} people` : `${room?.capacity} person`}
            </h6>
            <h6>{room?.pets ? 'pets allowed' : 'no pets allowed'}</h6>
            <h6>{room?.breakfast && 'free brackfast included'}</h6>
          </article>
        </div>
      </section>
      <section className="room-extras">
        <h6>extras</h6>
        <ul className="extras">
          {room?.extras.map((item, index) => {
            return <li key={index}>-{item}</li>;
          })}
        </ul>
      </section>
    </>
  );
}
