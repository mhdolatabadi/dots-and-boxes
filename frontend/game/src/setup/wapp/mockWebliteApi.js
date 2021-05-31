if (process.env.NODE_ENV === 'development' && !window.W) {
  const id = '1'
  const firstname = 'جواد'
  const lastname = 'خیابانی'
  const role = id === '1' ? 'student' : id === '2' ? 'teacher' : 'other'
  const major = id === '1' ? 'ریاضی و فیزیک' : undefined
  const specialities = id === '2' ? ['نگارش فارسی'] : undefined
  const base =
    id === '1' ? 'یازدهم' : id === '2' ? ['یازدهم', 'دهم'] : undefined

  window.W = {
    setHooks: ({ wappWillStart }) => {
      setTimeout(wappWillStart, 20, () => {})
    },
    initializeAsync: async () => {},
    analytics: (...args) => console.log('weblite.wapp:analytics', ...args),
    checkPurchase: async () => true,
    purchase: () => {},
    user: {
      getId: () => 1,
      getFirstname: () => firstname,
      getLastname: () => lastname,
      getProfile: async () => ({
        role,
        base,
        major,
        specialities,
        school: 'Island Academy International',
        schoolId: 'b91f4e04-8ceb-49f6-a830-7fd9d6d34263',
      }),
      editProfile: async () => ({
        role,
        school: 'International School of Aruba',
        schoolId: 'b91f4e04-8ceb-49f6-a830-7fd9d6d34264',
      }),

      getInfo: () => ({
        bio: 'bio',
        firstname,
        id,
        lastname,
        username: 'flp',
        profileImage:
          '20201002_155139.jpg-@-676004ed-f92f-44dc-bd34-7dea53b2d6cf.jpg',
      }),
    },
    fileSystem: {
      upload: async (superagent, ...args) => {
        console.log(`start uploading with this arguments = ${args}`)
        await new Promise(r => setTimeout(r, 2000))
        return {
          url: 'https://picsum.photos/208/117?random=1',
          name: 'fileName.ext',
        }
      },
    },
    wapp: {
      getInput: () => ({
        subjects: [
          {
            nodeId: 16134,
            path: 'متوسطه دوم - رشته انساني - دین و زندگی - دین و زندگی 1 (ویژه انسانی) - درس اول : هدف زندگی - متن',
            pathNode: [13, 10, 15829, 16076, 16132, 16133],
          },
        ],
      }),
      setFullscreen: () => {},
      doneDrawer: () => {},
      getWisId: () => 'b91f4e04-8ceb-49f6-a830-7fd923546d34263',
    },
    users: {
      openProfile: userId => console.log(userId),
      getById: async ([fid = '1', sid = '2', tid = '3']) => ({
        [fid]: {
          id: fid,
          firstname: 'جواد',
          lastname: 'خیابانی',
          username: 'user_fid',
        },
        [sid]: {
          id: sid,
          firstname: 'کریم',
          lastname: 'بنزما',
          username: 'user_sid',
          profileImage:
            'deno_matrix_200.jpg-@-b66ae725-02d3-4286-a642-0ab8b2a04083.jpg',
        },
        [tid]: {
          id: tid,
          firstname: 'رضا',
          lastname: 'رشید پور',
          username: 'rrashid',
        },
      }),
    },
    messages: {
      sendMessageToCurrentChat: async (...args) => console.log(...args),
    },
    wappSystem: { runWapp: (...args) => console.log(...args) },
    images: {
      openModal: ({ src }) => console.log('open the image in a modal:', src),
    },
    chats: {
      getPublicChatByUsername: async () => ({ id: 'channelTestId' }),
      join: chatId => console.log('Join To:', chatId),
    },
    notifications: {
      sendToUsers: (
        title,
        body,
        type = ['weblite'],
        data = {},
        userIds = [],
      ) => {
        console.log(
          `
          Sends notification to users specified by their Ids.
          Note: When sending push notifications, It’s not necessary to pin wapp.`,
          { title, body, type, data, userIds },
        )
      },
    },
  }
}
