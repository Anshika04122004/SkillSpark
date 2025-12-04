# Skill Spark Learning App

A learning application built with:

-   **Frontend:** ReactJS + Flutter\
-   **Backend:** FastAPI (Python)\
-   **Database:** PostgreSQL\
-   **AI Components:**
    -   Speech-to-Text: Whisper.cpp\
    -   Summaries: T5-small\
    -   Quiz Generation: flan-t5-small\
    -   Embeddings: SentenceTransformers all-MiniLM-L6-v2\
    -   Recommendation Engine: FAISS

## Features

-   Video transcript extraction\
-   Automated summaries\
-   Quiz generation from content\
-   Smart recommendations based on embeddings\
-   Multi-platform front-end (Web + Mobile)

## Setup Instructions

### Backend (FastAPI)

1.  Create a virtual environment\

2.  Install dependencies:

    ``` bash
    pip install -r requirements.txt
    ```

3.  Run the server:

    ``` bash
    uvicorn main:app --reload
    ```

### Frontend (ReactJS)

``` bash
npm install
npm start
```

### Flutter App

``` bash
flutter pub get
flutter run
```

## Database

Use PostgreSQL and update `.env` with credentials.

## AI Services

Models run locally using Python + FAISS + Whisper.cpp.

------------------------------------------------------------------------

