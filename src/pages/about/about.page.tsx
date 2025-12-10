import { Button, Modal } from '@shared/ui';
import { useSuspenseQuery } from '@tanstack/react-query'; // <--- Diqqət: Suspense
import { useEffect, useState } from 'react';
import styles from './about.module.scss';
import { aboutQueryOptions } from './api/about.api';

const AboutPage = () => {
	// useQuery əvəzinə useSuspenseQuery istifadə edirik.
	// Bu, data gələnə qədər komponenti "suspend" edir (loading göstərmir, yuxarı ötürür).
	// useSuspenseQuery: Data gələnə qədər komponenti render etmir (Suspense fallback işə düşür).
	// Niyə edirik? {data, isLoading} yoxlamaları ilə kodu çirkləndirməmək üçün. Data həmişə var!
	const { data } = useSuspenseQuery(aboutQueryOptions);
	const [isModalOpen, setIsModalOpen] = useState(false);
	// if (Math.random() > 0.5) throw new Error("Süni partlayış! 💣");
	useEffect(() => {
		setTimeout(() => {
			console.log('test');
		}, 5000);
	}, []);
	return (
		<div className={styles.container}>
			{/* Artıq Valibot tərəfindən transform olunmuş datanı istifadə edirik */}
			<h2>{data.header}</h2>
			<p className={styles.description}>{data.description}</p>

			<div style={{ marginTop: 20 }}>
				<Button onClick={() => setIsModalOpen(true)}>Detallı Baxış</Button>
			</div>

			<Modal title="Şirkət Detalları" isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
				<p>
					Burada şirkət haqqında əlavə məlumatlar olacaq. Radix UI sayəsində ESC basanda bağlanacaq.
				</p>
				<div style={{ marginTop: 15, display: 'flex', justifyContent: 'flex-end' }}>
					<Button variant="danger" onClick={() => setIsModalOpen(false)}>
						Bağla
					</Button>
				</div>
			</Modal>
		</div>
	);
};
export default AboutPage;
