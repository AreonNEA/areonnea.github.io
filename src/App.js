import React, { useState, useEffect } from 'react';
import CutInput from './CutInput';
import CutTable from './CutTable';
import BoardDisplay from './BoardDisplay';
import MobileView from './MobileView';
import ImageSelector from './ImageSelector';
import styles from './styles/App.module.css';
import { translations } from './translations';

function App() {
  const [cuts, setCuts] = useState([]);
  const [boards, setBoards] = useState([]);
  const [boardCount, setBoardCount] = useState(0);
  const [totalCuts, setTotalCuts] = useState(0);
  const [currentCut, setCurrentCut] = useState(null);
  const [language, setLanguage] = useState('en');
  const [selectedImage, setSelectedImage] = useState('/images/image1.png');  
  const boardWidth = 3630;
  const boardHeight = 1830;

  const addCut = (cut) => {
    setCuts([...cuts, cut]);
    setTotalCuts(totalCuts + cut.quantity);
  };

  const deleteCut = (index) => {
    const cutToDelete = cuts[index];
    setCuts(cuts.filter((_, i) => i !== index));
    setTotalCuts(totalCuts - cutToDelete.quantity);
  };

  const editCut = (index, updatedCut) => {
    const updatedCuts = cuts.map((cut, i) => (i === index ? updatedCut : cut));
    setCuts(updatedCuts);
    setCurrentCut(null);
  };

  const placeCutsOnBoards = () => {
    const sortedCuts = [...cuts].sort((a, b) => (b.width * b.height) - (a.width * a.height));
    const newBoards = [];
    let currentBoard = createNewBoard();
    newBoards.push(currentBoard);

    sortedCuts.forEach(cut => {
      for (let i = 0; i < cut.quantity; i++) {
        if (!placeCutOnBoard(currentBoard, cut)) {
          currentBoard = createNewBoard();
          newBoards.push(currentBoard);
          placeCutOnBoard(currentBoard, cut);
        }
      }
    });

    setBoards(newBoards);
    setBoardCount(newBoards.length);
  };

  const createNewBoard = () => {
    return {
      width: boardWidth,
      height: boardHeight,
      freeSpaces: [{ x: 0, y: 0, width: boardWidth, height: boardHeight }],
      cuts: []
    };
  };

  const placeCutOnBoard = (board, cut) => {
    for (let i = 0; i < board.freeSpaces.length; i++) {
      let space = board.freeSpaces[i];
      if (space.width >= cut.width && space.height >= cut.height) {
        board.cuts.push({ ...cut, x: space.x, y: space.y });
        splitFreeSpace(board, space, cut);
        return true;
      }
    }
    return false;
  };

  const splitFreeSpace = (board, space, cut) => {
    const index = board.freeSpaces.indexOf(space);
    board.freeSpaces.splice(index, 1);

    const newSpaces = [];

    if (space.width > cut.width) {
      newSpaces.push({
        x: space.x + cut.width,
        y: space.y,
        width: space.width - cut.width,
        height: cut.height
      });
    }

    if (space.height > cut.height) {
      newSpaces.push({
        x: space.x,
        y: space.y + cut.height,
        width: space.width,
        height: space.height - cut.height
      });
    }

    board.freeSpaces.push(...newSpaces);
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    handleResize(); // Прямой вызов для начальной проверки
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.table}>
      {isMobile ? (
        <MobileView />
      ) : (
        <div>
          <div className={styles.select}>
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="en">English</option>
              <option value="ru">Русский</option>
              <option value="hy">Հայերեն</option>
            </select>
          </div>
          <div className={styles.center}>
            <h1>{translations[language]?.calculate || translations['en'].calculate}</h1>

            <CutInput
              onAdd={addCut}
              onEdit={editCut}
              currentCut={currentCut}
              setCurrentCut={setCurrentCut}
              boardWidth={boardWidth}
              boardHeight={boardHeight}
              translations={translations[language] || translations['en']}
            />
            <CutTable
              cuts={cuts}
              onEdit={setCurrentCut}
              onDelete={deleteCut}
              translations={translations[language] || translations['en']}
            />
            <button className={styles.button} onClick={placeCutsOnBoards}>
              {translations[language]?.calculate || translations['en'].calculate}
            </button>
            <BoardDisplay
              boards={boards}
              setBoards={setBoards}
              setBoardCount={setBoardCount}
              boardWidth={boardWidth}
              boardHeight={boardHeight}
              selectedImage={selectedImage}  
              setSelectedImage={setSelectedImage} 
              boardCount={boardCount}
              totalCuts={totalCuts}
              setTotalCuts={setTotalCuts}
              translations={translations[language] || translations['en']}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
