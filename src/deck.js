import _ from 'lodash';

const deck = [
    '6s', '7s', '8s', '9s', 'Ts', 'Js', 'Qs', 'Ks', 'As',
    '6h', '7h', '8h', '9h', 'Th', 'Jh', 'Qh', 'Kh', 'Ah',
    '6d', '7d', '8d', '9d', 'Td', 'Jd', 'Qd', 'Kd', 'Ad',
    '6c', '7c', '8c', '9c', 'Tc', 'Jc', 'Qc', 'Kc', 'Ac',
];

const getMemoDeck = () => {
    const shuffledDeck = _.shuffle(deck);
    const slicedDeck = _.slice(shuffledDeck, 0, 15);
    const doubleDeck = _.shuffle([...slicedDeck, ...slicedDeck]);
    return _.chunk(doubleDeck, 6);
};

export default getMemoDeck;
