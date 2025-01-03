import prisma from "../utils/prisma.js";

const appUrl = process.env.APP_URL;

export async function index(req, res, next) {
  try {
    const [data, meta] = await prisma.movie
      .paginate({
        where: {
          userId: req.user.id,
        },
      })
      .withPages({
        limit: 12,
      });
    res.json({
      data,
      meta,
    });
  } catch (error) {
    next(error);
  }
}

export async function show(req, res, next) {
  try {
    const params = req.params;
    const movie = await prisma.movie.findUniqueOrThrow({
      where: { id: params.id, userId: req.user.id },
    });
    return res.json(movie);
  } catch (error) {
    next(error);
  }
}

export async function create(req, res, next) {
  try {
    const body = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "poster is required",
      });
    }
    const data = {
      title: body.title,
      year: +body.year,
      poster: `${appUrl}/uploads/${req.file.filename}`,
      userId: req.user.id,
    };
    const movie = await prisma.movie.create({
      data,
    });
    return res.json(movie);
  } catch (error) {
    next(error);
  }
}

export async function update(req, res, next) {
  try {
    const body = req.body;
    const params = req.params;

    const data = {
      title: body.title,
      year: +body.year,
      userId: req.user.id,
    };

    if (req.file) {
      data.poster = `${appUrl}/uploads/${req.file.filename}`;
    }

    const movie = await prisma.movie.update({
      where: { id: params.id },
      data,
    });
    return res.json(movie);
  } catch (error) {
    next(error);
  }
}
