import User from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        is_verified: true,
        is_deleted: false,
      },
    });
    return res.status(200).json({ message: "All users list:", data: users });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const editUser = async (req, res) => {
  const {
    first_name,
    last_name,
    gender,
    year_of_birthday,
    phone,
    country,
    city,
    address,
    building_name,
    region,
  } = req.body;
  const { id } = req.user;
  try {
    const user = await User.findByPk(id);
    if (first_name || last_name) {
      user.first_name = first_name ? first_name : user.first_name;
      user.last_name = last_name ? last_name : user.last_name;
      let tempUsername = first_name + last_name;
      let newUsername = await validateUsername(tempUsername);
      user.username = newUsername;
    }
    user.gender = gender ? gender : user.gender;
    user.year_of_birthday = year_of_birthday
      ? year_of_birthday
      : user.year_of_birthday;
    user.phone = phone ? phone : user.phone;
    user.country = country ? country : user.country;
    user.city = city ? city : user.city;
    user.address = address ? address : user.address;
    user.building_name = building_name ? building_name : user.building_name;
    user.region = region ? region : user.region;

    const updatedUser = await user.save();

    return res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await User.findOne({ where: { id: id } });

    user.email += ` is deleted ${id}`;
    user.is_deleted = true;
    user.save();
    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


export const deleteUserByAmin = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ where: { id } });

    user.email = `${user.email} is deleted ${id}`;
    user.is_deleted = true;
    await user.save();

    return res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAdmins = async (req, res) => {
  try {
    const admins = await User.findAll({
      where: { role: 1, is_verified: true, is_deleted: false },
    });

    return res.status(200).json({ message: "All admins list:", data: admins });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
