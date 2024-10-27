class Video:
    """
    A class to represent a video with various educational resources.

    Attributes:
    -----------
    _path : str
        The file path to the video.
    _url : str
        The URL of the video.
    _summary : str
        A brief summary of the video content.
    _lesson_plan : str
        A lesson plan related to the video.
    _quiz : str
        A quiz associated with the video.

    Methods:
    --------
    path:
        Getter and setter for the file path of the video.
    url:
        Getter and setter for the URL of the video.
    summary:
        Getter and setter for the video summary.
    lesson_plan:
        Getter and setter for the lesson plan of the video.
    quiz:
        Getter and setter for the quiz associated with the video.
    """
    def __init__(self, path, url, summary, lesson_plan, quiz):
        self._path = path
        self._url = url
        self._summary = summary
        self._lesson_plan = lesson_plan
        self._quiz = quiz

    # Getter and Setter for 'path'
    @property
    def path(self):
        return self._path

    @path.setter
    def path(self, value):
        self._path = value

    # Getter and Setter for 'url'
    @property
    def url(self):
        return self._url

    @url.setter
    def url(self, value):
        self._url = value

    # Getter and Setter for 'summary'
    @property
    def summary(self):
        return self._summary

    @summary.setter
    def summary(self, value):
        self._summary = value

    # Getter and Setter for 'lesson_plan'
    @property
    def lesson_plan(self):
        return self._lesson_plan

    @lesson_plan.setter
    def lesson_plan(self, value):
        self._lesson_plan = value

    # Getter and Setter for 'quiz'
    @property
    def quiz(self):
        return self._quiz

    @quiz.setter
    def quiz(self, value):
        self._quiz = value
