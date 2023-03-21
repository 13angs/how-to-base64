import * as React from 'react';

export default function VideoToImg() {
    const [file, setFile] = React.useState({
        imgFile: null,
        imgFileType: null,
        videoFile: null,
        videoFileType: null
    });

    const readAsBase64 = (base64Data) => {
        return base64Data.replace("data:", "")
            .replace(/^.+,/, "");
    }

    const handleSetFile = (e) => {
        const base64String = readAsBase64(e.target.result);
        setFile(prev => ({
            ...prev,
            videoFile: base64String
        }))
    }

    const handleUpload = (e) => {
        const file = e.target.files[0];
        setFile(prev => ({
            ...prev,
            videoFileType: file.type
        }))
        const reader = new FileReader();
        reader.addEventListener('load', handleSetFile);
        // reader.readAsText(file);
        reader.readAsDataURL(file);
    }

    const handleConvertVidToImg = () => {
        // Get a reference to the video element
        const video = document.getElementById('my-video');

        // Get a reference to the canvas element
        const canvas = document.getElementById('my-canvas');
        const ctx = canvas.getContext('2d');

        // Wait for the video to be ready to play
        // Set the canvas dimensions to match the video dimensions
        const { width, height } = video.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;

        //   // Draw the current video frame onto the canvas
        if (video) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        }

        const imgData = canvas.toDataURL();
        const imgType = imgData.split(':')[1].split(';')[0];
        const b64data = readAsBase64(imgData)
        setFile(prev => ({
            ...prev,
            imgFile: b64data,
            imgFileType: imgType
        }));

        //   // Convert the canvas to a data URL and display it as an image
        //   const image = new Image();
        //   image.src = canvas.toDataURL();
        //   console.log(canvas.toDataURL());
        //   document.body.appendChild(image);
        //   video.addEventListener('canplay', () => {
        //   });
    }

    console.log(file.imgFile)
    console.log(file.imgFileType)

    return (
        <div>
            <h2 className="text-lg font-extrabold">
                Converting video to image
            </h2>
            <div className="border-b my-2" />
            <div className="grid grid-cols-2 gap-4">
                <form className="flex justify-center items-center space-x-6 border border-dotted py-11">
                    <label className="block">
                        <span className="sr-only">Choose profile photo</span>
                        <input onChange={handleUpload} type="file" className="block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-violet-700
                        hover:file:bg-violet-100
                        "/>
                    </label>
                </form>
                <div>
                    {
                        file.videoFile ?
                            <>
                                <div className='mb-3'>
                                    <video id="my-video" title="base64-video" className="w-full aspect-video" src={`data:${file.videoFileType};base64,${file.videoFile}`} controls></video>
                                    {/* <code className='text-slate-500 truncate'>
                                        {file.videoFile ? file.videoFile : ""}
                                    </code> */}
                                    <span>File type: {file.videoFileType ? file.videoFileType : ""}</span>
                                    <textarea className='text-black w-full text-sm h-20 bg-slate-100 p-2 mt-2 overflow-x-hidden' value={file.videoFile ? file.videoFile : ""} />
                                </div>
                                <div>
                                    {/* <textarea className='text-black w-full text-sm h-20 bg-slate-100 p-2' value={file.videoFile ? file.videoFile : ""} /> */}
                                </div>
                                <button className='block w-full
                                                    mb-3 py-2 px-4
                                                    rounded-full border-0
                                                    text-sm font-semibold
                                                    bg-violet-50 text-violet-700
                                                    hover:bg-violet-100' 
                                    onClick={handleConvertVidToImg}>Convert to image</button>
                                <div>
                                    <canvas hidden id="my-canvas" className='w-full aspect-video' />
                                    {file.imgFile && 
                                        <>
                                            <img className='w-full' src={`data:${file.imgFileType};base64,${file.imgFile}`} alt="" />
                                            <span>File type: {file.imgFileType ? file.imgFileType : ""}</span>
                                            <textarea className='text-black w-full text-sm h-20 bg-slate-100 p-2 mt-2 overflow-x-hidden' value={file.imgFile ? file.imgFile : ""} />
                                        </>
                                    }
                                </div>
                            </> :
                            <div className='flex justify-center items-center py-11'>No video being uploaded</div>
                    }
                </div>
            </div>

        </div>
    )
}