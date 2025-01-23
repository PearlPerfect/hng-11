// const addUserToOrganization = async (req, res) => {
//   const orgId = req.params.orgId;
//   const userId = req.user.userId;
//   const userToBeRegistered = req.body.userId; // Assuming user ID is in request body

//   try {
//     // Validate input data (optional)
//     if (!orgId || !userId || !userToBeRegistered) {
//       return res.status(400).json({
//         status: "Bad Request",
//         message: "Missing required fields",
//       });
//     }
//     const organisationData = await Organisation.findByPk(orgId)
//     if (!organisationData) {
//       return res.status(404).json({
//         status: "Not found",
//         message: "Organisation not found",
//       });
//     }
    
//     const userToBeAdded = await User.findByPk(userToBeRegistered)
//     const isMember = await (userToBeAdded.hasOrganisation(orgId))
//     console.log(isMember)
//     if (isMember) {
//       return res.status(400).json({
//         status: "Bad Request",
//         message: "User already belongs to this organisation",
//       });
//     }

   
//    const organisation = await Organisation.create({
//       orgId: organisationData.orgId,
//       name: organisationData.name,
//       description: organisationData.description,
//       userId : userToBeRegistered
//     })

//     const user = await User.findByPk(userToBeRegistered);
//     await user.addOrganisation(organisation)

//     res.status(200).json({
//       status: "success",
//       message: "User added to organisation successfully",
//       data: organisation
//     });
//   } catch (error) {
//     console.error(error);
//     if (error instanceof SequelizeValidationError) {
//       return res.status(400).json({
//         status: "Bad Request",
//         message: error.errors[0].message, 
//       });
//     } else {
//       return res.status(500).json({
//         status: "Error",
//         message: "Internal server error", 
//       });
//     }
//   }
// };




// const addUserToOrganization = async (req, res) => {
//   const orgId = req.params.orgId;
//   const owner = req.user.userId;
//   const userId = req.body.userId;

//   try {
//     const organisationData = await Organisation.findByPk(orgId);
//     if (!organisationData) {
//       return res.status(404).json({
//         status: "Not found",
//         message: "Organisation not found",
//       });
//     }

//     const isAuthourizedOwner = organisationData.userId;
//     if (owner !== isAuthourizedOwner) {
//       return res.status(401).json({
//         status: "unauthorized",
//         message: "You are not authorized to perform this action",
//       });
//     }

//     // Check if user is already a member
//     const isMember = await Organisation.findOne({where:{ userId}});

//     if (isMember) {
//       return res.status(400).json({
//         status: "Bad Request",
//         message: "User already belongs to this organisation",
//       });
//     }

//     // User is not a member, proceed with adding
//     await Organisation.create({
//       name: organisationData.name,
//       description: organisationData.description,
//       userId: userToBeRegistered,
//     });

//     res.status(200).json({
//       status: "success",
//       message: "User added to organisation successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       status: "Error",
//       message: "Internal server error",
//     });
//   }
// };




// const getOrganisations = async (req, res) => {
//   const userId = req.user.userId; // Assuming you have user data from middleware or auth
//   console.log(userId);
//   try {
//     const user = await User.findByPk(userId, {
//       include: [
//         {
//           model: Organisation,
//           as: "Organisations",
//         },
//       ],
//     });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const organisations = user.Organisations;
//     const response = {
//       orgId: organisations.orgId,
//       name: organisations.name,
//       description: organisations.description,
//     };
//     console.log(response);
//     return res.status(200).json({
//       status: "success",
//       message: "Your organizations details retrieved successfully",
//       data: {
//         organisations: organisations,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(400).json({ message: "Bad request" });
//   }
// };

// const getOrganisations = async (req, res) => {
//   const userId = req.user.userId; // Get user ID from authenticated user

//   try {
//     const organisations = await Organisation.findAll({
//       where: {
//         [Sequelize.Op.or]: [
//           { userId },
//           {
//             // Organisations where the user is a member (through User-Organisation association)
//             "$user_org.userId$": userId,
//           },
//         ],
//       },
   
//     });

//     res.status(200).json({
//       status: "success",
//       message: "Organisations retrieved successfully",
//       data: {
//         organisations: organisations.map((organisation) => ({
//           orgId: organisation.orgId,
//           name: organisation.name,
//           description: organisation.description,
        
//         })),
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       status: "Error",
//       message: "Internal server error",
//     });
//   }
// };