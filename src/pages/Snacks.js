import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SnacksContainer from '../components/SnacksList/SnacksContainer';
import SuggestionDialog from '../components/SuggestionDialog';
import { fetchSnacks } from '../redux/features/snacks/snacksSlice';
import { makeSuggestion } from '../services/UsersService';
import styles from '../styles/Snacks.module.css';

const Snacks = () => {
  const dispatch = useDispatch();
  const { snacks, selectedFilters } = useSelector((state) => state.snacksReducer);
  const { userId } = useSelector((state) => state.usersReducer.profile);
  const [isSuggestionOpen, setIsSuggestionOpen] = useState(false);
  const [suggestionText, setSuggestionText] = useState('');

  const handleCloseSuggestion = () => {
    setIsSuggestionOpen(false);
  };

  const openSuggestion = () => {
    setIsSuggestionOpen(true);
  };

  const handleChangeText = (event) => {
    setSuggestionText(event.target.value);
  };

  const handleSubmit = (event) => {
    const submission = suggestionText.trim();
    if (submission === '') {
      return;
    }
    if (event.key === 'Enter' || event.type === 'click') {
      makeSuggestion(userId, submission);
      setIsSuggestionOpen(false);
      setSuggestionText('');
    }
  };

  useEffect(() => {
    dispatch(fetchSnacks());
  }, [dispatch]);

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.leftBox}>
          <p> Snacks </p>
        </div>
        <div className={styles.suggestBox}>
          <div className={styles.suggestBoxQ}>{"Can't find what you want?"}</div>
          <p className={styles.suggestLabel} onClick={openSuggestion}>
            Suggest a snack!
          </p>
        </div>
      </div>
      <SnacksContainer snacks={snacks} filters={selectedFilters} />
      <SuggestionDialog
        open={isSuggestionOpen}
        value={suggestionText}
        handleClose={handleCloseSuggestion}
        onSubmit={handleSubmit}
        onChangeText={handleChangeText}
      />
    </div>
  );
};

export default Snacks;
