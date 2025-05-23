import globalImage from '@/image';
import { useEffect, useState } from 'react';
import './box.less';

const images = [
  globalImage.black1,
  globalImage.black2,
  globalImage.black3,
  globalImage.black4,
  globalImage.black5,
  globalImage.black6,
  globalImage.white1,
  globalImage.white2,
  globalImage.white3,
  globalImage.gray1,
];
const dogImages = [
  globalImage.dog1,
  globalImage.dog2,
  globalImage.dog3,
  globalImage.dog4,
  globalImage.dog5,
  globalImage.dog6,
  globalImage.dog7,
  globalImage.dog8,
  globalImage.dog9,
];
const diamondImage = globalImage.CoinImage;
const bombImage = globalImage.BoomImage1;
interface GridItem {
  flipped: boolean;
  bgImage: string;
  overlayImage: string | null;
}
const Box = ({ gridSize, leftValue, thresholds, isPlaying, onGameEnd }) => {
  const [gridItems, setGridItems] = useState<GridItem[]>([]);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const newGrid = Array(gridSize * gridSize)
      .fill(null)
      .map(() => ({
        flipped: false,
        bgImage: images[Math.floor(Math.random() * images.length)],
        overlayImage: null,
      }));
    setGridItems(newGrid);
    setClickCount(0);
  }, [gridSize, isPlaying]);

  const handleFlip = (index) => {
    if (!isPlaying) return;
    if (gridItems[index].flipped) return;

    const newGrid = [...gridItems];
    newGrid[index].flipped = true;
    setClickCount((prevCount) => prevCount + 1);

    if (clickCount + 1 === Number(thresholds[0])) {
      newGrid[index].overlayImage = diamondImage;
      setGridItems(newGrid);
      setTimeout(() => {
        onGameEnd('win');
      }, 100);
      return;
    } else if (clickCount + 1 === Number(thresholds[1])) {
      newGrid[index].overlayImage = bombImage;
      setGridItems(newGrid);
      setTimeout(() => {
        onGameEnd('lose');
      }, 100);
      return;
    } else {
      newGrid[index].overlayImage = dogImages[Math.floor(Math.random() * dogImages.length)];
    }

    setGridItems(newGrid);

    if (clickCount + 1 >= leftValue) {
      setTimeout(() => {
        onGameEnd('lose');
      }, 100);
    }
  };

  const cellSize = Math.min(
    (602 - (gridSize - 1) * 10) / gridSize,
    (592 - (gridSize - 1) * 10) / gridSize,
  );

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${gridSize}, ${cellSize}px)`,
        width: '622px',
        height: '612px',
        background: '#000',
        boxSizing: 'border-box',
        gap: '10px',
        padding: '10px 15px',
      }}
    >
      {gridItems.map((item, index) => (
        <div
          key={index}
          style={{
            width: cellSize,
            height: cellSize,
            backgroundImage: `url(${item.bgImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
            position: 'relative',
            cursor: isPlaying && !item.flipped ? 'pointer' : 'not-allowed',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          className={`grid-item ${item.flipped ? 'flipped' : ''}`}
          onClick={() => handleFlip(index)}
        >
          {item.flipped && (
            <div style={{ width: 'calc(100% - 20px)', height: 'calc(100% - 20px)' }}>
              <img
                src={item.overlayImage ?? undefined}
                alt="overlay"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Box;
