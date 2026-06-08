{
  userId: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  fileType: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
