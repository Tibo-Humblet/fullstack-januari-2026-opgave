import { Classroom, StatusMessage } from '@types';
import ClassroomService from '@services/ClassroomService';
import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'

const ClassroomCreateForm: React.FC = () => {

	 const { t } = useTranslation();

	// start useStates
		const [name, setName] = useState('');
		const [nameError, setNameError] = useState<string | null>(null);
		const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);
	// end useStates

	// start functions
		const clearErrors = () => {
			setNameError(null);
			setStatusMessage(null);
		}

		const validate = ():boolean => {
			let result = true;

			if (!name || name.trim() === '') {
				setNameError(t('classroom.create.form.error.empty'));
				result = false;
			}

			return result;
		}

		const handleSubmit = async (event) => {
			event.preventDefault();
			clearErrors();

			if (!validate()) {
				return;
			}

			const newclassroom: Classroom = { name: name };

			try {

				const response = await ClassroomService.createClassroom(newclassroom);

				setStatusMessage({ 
					message: t('classroom.create.form.succes'), 
					type: 'success' 
				});

				if (!response.ok) { 
					setStatusMessage({
				        message: t('classroom.create.form.error.exists'),
				        type: 'error',
				     });
				}


			} catch { 
				setStatusMessage({ 
					message: t('classroom.create.form.error.general'), 
					type: 'error' 
				}); 
			}
		}
	// end functions

	return (
	   <div className="max-w-sm m-auto">
	      <div>
	        <h3 className="px-0">{t('classroom.title')}</h3>
	      </div>

	      {/* Status message */}
	      {statusMessage && (
	        <div className="row">
	          <ul className="list-none mb-3 mx-auto">
	            <li
	              className={
	              	statusMessage.type === 'error'
	                	? 'text-red-800'
	                	: 'text-green-800'
	              	}>
	              {statusMessage.message}
	            </li>
	          </ul>
	        </div>
	      )}

	      <form onSubmit={handleSubmit}>
	        {/* Name input */}
	        <div>
	          <label
	            htmlFor="nameInput"
	            className="block mb-2 text-sm font-medium">
	            {t('classroom.create.form.label')}
	          </label>

	          <input
	            id="nameInput"
	            type="text"
	            value={name}
	            onChange={(e) => setName(e.target.value)}
	            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
	          />

	          {nameError && (
	            <div className="text-red-800 mt-1">{nameError}</div>
	          )}
	        </div>

	        {/* Submit button */}
	        <div className="row mt-3">
	          <button
	            type="submit"
	            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
	            {t('classroom.create.form.button')}
	          </button>
	        </div>
	      </form>
	    </div>
	);
}

export default ClassroomCreateForm;