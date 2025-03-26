"use client"

import { useState, useRef } from "react"
import { Button } from "../components/ui/button" // Try this first (up one level)
import { CameraIcon, Upload } from "lucide-react"

export default function Home() {
  const [photo, setPhoto] = useState(null)
  const [camera, setCamera] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const fileRef = useRef(null)

  const startCamera = async () => {
    try {
      setError(null)
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      videoRef.current.srcObject = stream
      setCamera(true)
    } catch (err) {
      console.error("Camera error:", err)
      setError("Camera access denied. Please use file upload instead.")
    }
  }

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      canvas.getContext("2d").drawImage(video, 0, 0)
      setPhoto(canvas.toDataURL("image/jpeg"))
    }
  }

  const uploadPhoto = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setPhoto(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const createQuiz = async () => {
    try {
      setLoading(true)
      const res = await fetch(photo)
      const blob = await res.blob()

      const formData = new FormData()
      formData.append("file", new File([blob], "photo.jpg", { type: "image/jpeg" }))

      await fetch("/api/quiz", {
        method: "POST",
        body: formData,
      })

      setSuccess(true)
    } catch (err) {
      console.error("Error:", err)
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setPhoto(null)
    setSuccess(false)
    setError(null)

    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }

    setCamera(false)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Intellect Assault</h1>
      <p className="text-sm text-gray-500 mb-4">Generate a quiz shooter game from your notes</p>

      {success ? (
        <div className="space-y-4 text-center">
          <p className="text-green-600 font-medium">Quiz created successfully!</p>
          <Button onClick={reset}>Take New Photo</Button>
        </div>
      ) : (
        <>
          {!camera && !photo && (
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button onClick={startCamera}>Open Camera</Button>
                <Button variant="outline" onClick={() => fileRef.current.click()}>
                  <Upload className="mr-2 h-4 w-4" /> Upload Image
                </Button>
                <input type="file" ref={fileRef} onChange={uploadPhoto} accept="image/*" className="hidden" />
              </div>

              {error && <div className="text-red-500 text-sm mt-2 text-center">{error}</div>}
            </div>
          )}

          {photo ? (
            <img src={photo || "/placeholder.svg"} alt="Captured" className="w-full max-w-sm mt-4 object-contain" />
          ) : (
            <div className="mt-4 flex flex-col items-center">
              <video ref={videoRef} autoPlay playsInline className="w-full max-w-sm object-contain" />
              <canvas ref={canvasRef} className="hidden" />
              {camera && (
                <div className="w-full max-w-sm bg-black flex justify-center items-center py-4">
                  <Button
                    onClick={takePhoto}
                    className="w-16 h-16 rounded-full bg-white border-4 border-white flex items-center justify-center group"
                  >
                    <CameraIcon className="h-6 w-6 text-black group-hover:text-white transition-all" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {photo && (
            <div className="flex justify-center gap-4 mt-4">
              <Button onClick={reset}>Retake Photo</Button>
              <Button className="bg-blue-500" onClick={createQuiz} disabled={loading}>
                {loading ? "Creating quiz..." : "Create Quiz"}
              </Button>
            </div>
          )}
        </>
      )}
    </main>
  )
}
