import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function ListCities(props) {

    const CITIES_URL = 'http://localhost:3001/mini-ecommerce/state/:state/cities'
    const [cities, setCities] = useState([]);

    useEffect(() => {

        async function getCities() {
            try {
                let { data } = await axios.get(CITIES_URL.replace(':state', props.state));
                setCities(data);
            } catch(err) {
                setCities([]);
            }
        }

        if (props.state !== '') {
            getCities();
        }

    }, [props.state]);

    return cities.map(city => 
        <option
            key={city}
            value={city}
            data-testid={city}>
            {city}
        </option>    
    );
}

ListCities.propTypes = {
    state: PropTypes.string.isRequired
}

export default ListCities;