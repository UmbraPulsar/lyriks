import { loader } from '../assets';

const Loader = ({ title }) => (
	<div className='min-w-full flex justify-center items-center flex-col'>
		<img
			src={loader}
			alt='loader'
			className='min-w-32 min-h-32 object-container'
		/>
		<h1 className='mt-2 font-bold text-2xl text-white'>
			{title || 'Loading...'}
		</h1>
	</div>
);

export default Loader;
