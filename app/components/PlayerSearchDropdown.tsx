'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PlayersTable } from '../types';

interface PlayerSearchDropdownProps {
	players: PlayersTable[];
	currentPlayerId: number;
}

export default function PlayerSearchDropdown({ players, currentPlayerId }: PlayerSearchDropdownProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredPlayers, setFilteredPlayers] = useState<PlayersTable[]>(players);
	const router = useRouter();

	const currentPlayer = players.find(player => player.id === currentPlayerId);

	useEffect(() => {
		const filtered = players.filter(player =>
			player.full_name.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredPlayers(filtered);
	}, [searchTerm, players]);

	const handlePlayerSelect = (playerId: number) => {
		router.push(`/dashboard?playerId=${playerId}`);
		setIsOpen(false);
		setSearchTerm('');
	};

	return (
		<div className="absolute right-0 top-0 w-full max-w-md ">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="w-full rounded-lg bg-gray-900 tron-border text-white px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-cyan-400 flex justify-between items-center"
			>
				<span className="truncate">
					{currentPlayer ? currentPlayer.full_name : 'Select Player'}
				</span>
				<svg
					className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
				</svg>
			</button>

			{isOpen && (
				<div className="absolute z-10 w-full rounded-lg mt-1 bg-gray-900 tron-border shadow-lg max-h-80 overflow-hidden">
					<div className="p-3 border-b border-gray-700">
						<input
							type="text"
							placeholder="Search players..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full bg-gray-800 text-white px-3 py-2 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
							autoFocus
						/>
					</div>
					<div className="overflow-y-auto max-h-64">
						{filteredPlayers.length === 0 ? (
							<div className="px-4 py-3 text-gray-400">No players found</div>
						) : (
							filteredPlayers.map((player) => (
								<button
									key={player.id}
									onClick={() => handlePlayerSelect(player.id)}
									className={`w-full text-left px-4 py-3 hover:bg-gray-800 transition-colors ${player.id === currentPlayerId ? 'bg-gray-800 text-cyan-400' : 'text-white'
										}`}
								>
									<div className="flex justify-between items-center">
										<span className="font-medium">{player.full_name}</span>
										<div className="flex items-center space-x-2">
											<span className="text-xs text-gray-400">#{player.id}</span>
											<span className={`text-xs px-2 py-1 rounded ${player.is_active ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'
												}`}>
												{player.is_active ? 'Active' : 'Inactive'}
											</span>
										</div>
									</div>
								</button>
							))
						)}
					</div>
				</div>
			)}
		</div>
	);
}
