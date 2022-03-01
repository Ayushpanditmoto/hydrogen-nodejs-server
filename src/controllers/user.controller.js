const { db } = require("../utils/db");
exports.uploadProfilePic = async (req, res, next) => {
  try {
    const currentUser = res.locals.user;
    const { profileImage, coverImage } = req.body;

    await db.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        profileImage,
        coverImage,
      },
      select: {
        id: true,
      },
    });

    return res.status(200).json({
      type: "success",
      message: "Profile pic uploaded successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

exports.fetchUserDetails = async (req, res, next) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: req.params.userId,
      },
      select: {
        id: true,
        coverImage: true,
        firstName: true,
        lastName: true,
        profileImage: true,
        _count: {
          select: {
            myFriends: true,
          },
        },
        myFriends: {
          take: 5,
          select: {
            id: true,
            firstName: true,
            profileImage: true,
          },
        },
      },
    });

    return res.status(200).json({
      type: "success",
      message: "Fetch user details",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.fetchFriends = async (req, res, next) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: req.params.userId,
      },
      select: {
        myFriends: {
          select: {
            id: true,
            firstName: true,
            profileImage: true,
          },
        },
      },
    });

    return res.status(200).json({
      type: "success",
      message: "Fetch user friends",
      data: {
        users: user.myFriends,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.fetchUserPosts = async (req, res, next) => {
  try {
    const posts = await db.post.findMany({
      where: {
        authorId: req.params.userId,
      },
      include: {
        author: {
          select: {
            firstName: true,
            coverImage: true,
          },
        },
      },
    });

    return res.status(200).json({
      type: "success",
      message: "Fetch user posts",
      data: {
        posts,
      },
    });
  } catch (error) {
    next(error);
  }
};
