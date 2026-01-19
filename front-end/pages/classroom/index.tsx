import Head from "next/head";
import Header from "@components/header";
import styles from "@styles/home.module.css";
import { useEffect, useState } from 'react';
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ClassroomCreateForm from "@components/Classrooms/ClassroomCreateForm";

const Classroom: React.FC = () => {

	const { t } = useTranslation();
	const [loggedInUser, setLoggedInUser] = useState<User>(null);

	useEffect(() => {
		setLoggedInUser(JSON.parse(sessionStorage.getItem('loggedInUser')));
	}, []);

	return (
		<>
			<Head>
				<title>{t('classroom.title')}</title>
			</Head>
			<Header />
			<main>
				{loggedInUser?.role !== "admin" ? (
						<p>{t('classroom.unauthorized')}</p>
					) : (
						<ClassroomCreateForm />
					)
				}
			</main>
		</>
	);
};

export const getServerSideProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  }
}

export default Classroom;