import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useGetSongsByCountryQuery } from '../redux/services/shazamcore';
import { Error, Loader, SongCard } from '../components';

const CountryTracks = () => {
	const [country, setCountry] = useState('');
	const [loading, setLoading] = useState(true);
	const { activeSong, isPlaying } = useSelector((state) => state.player);
	const { data, isFetching, error } = useGetSongsByCountryQuery(country);

	useEffect(() => {
		axios
			.get(
				`https://geo.ipify.org/api/v2/country?apiKey=at_kB5np526QT6yk4g0N0uEqoZRpVFgx`,
			)
			.then((res) => {
				setCountry(res?.data?.location?.country);
			})
			.catch((err) => {
				console.error(err);
			})
			.finally(() => setLoading(false));
	}, [country]);

	if (isFetching && loading)
		return <Loader title='Loading Songs around you...' />;

	if (error && country) return <Error />;

	return (
		<section>
			<h2 className='mt-4 mb-10 font-bold text-3xl text-white text-left'>
				Around you <span className='font-black'>{country}</span>
			</h2>
			<div className='flex flex-wrap justify-center md:justify-start gap-8'>
				{data?.map((song, i) => {
					return (
						<SongCard
							key={song.key}
							song={song}
							isPlaying={isPlaying}
							activeSong={activeSong}
							data={data}
							i={i}
						/>
					);
				})}
			</div>
		</section>
	);
};

export default CountryTracks;
