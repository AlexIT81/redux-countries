import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { List } from '../components/List';
import { Card } from '../components/Card';
import { Controls } from '../components/Controls';
import {
  selectCountriesInfo,
  selectVisibleCountries,
} from '../store/countries/countries-selectors';
import { useEffect } from 'react';
import { loadCountries } from '../store/countries/countries-actions';
import {
  selectControls,
} from '../store/controls/controls-selectors';

const Title = styled.h2`
  text-align: center;
  font-family: var(--family);
  color: var(--colors-text);
  font-weight: var(--fw-bold);
  font-size: var(--fs-md);
`;

export const HomePage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { search, region } = useSelector(selectControls);
  const countries = useSelector((state) =>
    selectVisibleCountries(state, { search, region })
  );
  const { status, error, qty } = useSelector(selectCountriesInfo);

  useEffect(() => {
    if (!qty) {
      dispatch(loadCountries());
    }
  }, [qty, dispatch]);

  return (
    <>
      <Controls />

      {error && <Title>Не могу получить данные!</Title>}
      {status === 'loading' && <Title>Загрузка...</Title>}
      {countries.length === 0 && status !== 'loading' && <Title>Нету найденных стран!</Title>}
      {status === 'received' && (
        <List>
          {countries.map((c) => {
            const countryInfo = {
              img: c.flags.png,
              name: c.name.official,
              info: [
                {
                  title: 'Population',
                  description: c.population.toLocaleString(),
                },
                {
                  title: 'Region',
                  description: c.region,
                },
                {
                  title: 'Capital',
                  description: c.capital[0],
                },
              ],
            };

            return (
              <Card
                key={c.flags.png}
                onClick={() => navigate(`/country/${c.name.official}`)}
                {...countryInfo}
              />
            );
          })}
        </List>
      )}
    </>
  );
};
