import { useEffect, useRef, useState } from 'react';
import { reduceLine } from '../../../helpers/helpers';
import { CrossSvg, FileSvg } from '../../../helpers/icons/icons';
import { AuthenticatedUser } from '../../../redux/auth/types';
import Avatar from '../../Avatar/Avatar';
import Preloader from '../../common/Preloader/Preloader';
import cl from './NewPostField.module.scss';

/* ------------- Types ------------- */
interface NewPostFieldProps {
  authProfile: AuthenticatedUser | undefined;
  isHomePage: boolean;
  isPostLoading: boolean;
  isPostDeleting: boolean;
  addPost: (body: string, image?: File) => void;
}

/* ------------- Component ------------- */
const NewPostField: React.FC<NewPostFieldProps> = ({
  authProfile,
  isHomePage,
  isPostDeleting,
  isPostLoading,
  addPost,
}) => {
  const [textArea, setTextArea] = useState('');
  const [file, setFile] = useState<File | undefined>(undefined);
  const inputFile = useRef<HTMLInputElement | null>(null);
  const textAreaElement = useRef<HTMLTextAreaElement>(null);
  const isLoading = isPostDeleting || isPostLoading;

  useEffect(() => {
    file !== undefined && textAreaElement.current?.focus();
  }, [file]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setTextArea(e.target.value);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addPost(textArea, file);
      setFile(undefined);
      setTextArea('');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files![0]);
    inputFile.current!.value = '';
  };

  const handleDeleteFile = () => {
    setFile(undefined);
    inputFile.current!.value = '';
  };

  const PreloaderComponent = <Preloader position='absolute' height='20px' width='20px' />;

  const InputComponent = (
    <>
      <label className={cl.uploadAreaLabel} htmlFor='file-input' children={<FileSvg className={cl.fileSvg} />} />
      <input
        ref={inputFile}
        className={cl.uploadArea}
        id='file-input'
        name='file-input'
        accept='image/*'
        onChange={handleFileUpload}
        type='file'
      />
    </>
  );

  return (
    <div className={cl.newPost}>
      <div className={cl.avatarContainer}>
        <Avatar photo={authProfile?.photos?.small} />
      </div>
      <div className={cl.textAreaContainer}>
        <textarea
          ref={textAreaElement}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={textArea}
          placeholder={isHomePage ? `What's new` : 'Write something...'}
          className={cl.textArea}
        />
        {file?.name && (
          <div className={cl.fileDescrBlock}>
            <div className={cl.fileDescr}>{reduceLine(file.name, 60)}</div>
            <CrossSvg className={cl.crossSvg} onClick={handleDeleteFile} />
          </div>
        )}
      </div>
      <div className={cl.fileInput}>{isLoading ? PreloaderComponent : InputComponent}</div>
    </div>
  );
};

export default NewPostField;
